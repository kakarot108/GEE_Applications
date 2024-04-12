
// Define the coordinates for the geometry
var coordinates = [
  [88.12094851304153, 21.485071498017472],
  [89.97763796616653, 21.485071498017472],
  [89.97763796616653, 22.265003821101335],
  [88.12094851304153, 22.265003821101335],
  [88.12094851304153, 21.485071498017472]
];

// Create a geometry from the coordinates
var polygon = ee.Geometry.Polygon(coordinates);

// Print the geometry to the console
print('Polygon Geometry:', polygon);

// Add the geometry to the map (optional)
Map.addLayer(polygon, {}, 'Polygon Geometry');


var l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2");

// Function to cloud mask and generate MNDWI
function preprocess(image){
  var qa = image.select('QA_PIXEL');
  var dilated = 1 << 1;
  var cirrus = 1 << 2;
  var cloud = 1 << 3;
  var shadow = 1 << 4;
  var mask = qa.bitwiseAnd(dilated).eq(0)
    .and(qa.bitwiseAnd(cirrus).eq(0))
    .and(qa.bitwiseAnd(cloud).eq(0))
    .and(qa.bitwiseAnd(shadow).eq(0));
  
  // Cloudfree image
  var masked = image.select(['SR_B.*'], ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'])
    .updateMask(mask)
    .multiply(0.0000275)
    .add(-0.2);
  
  // Band map
  var bandMap = { 
    GREEN: masked.select('B3'),
    SWIR1: masked.select('B6') 
  };
  
  // Generate MNDWI
  var mndwi = masked.expression('(GREEN - SWIR1) / (GREEN + SWIR1)', bandMap)
    .rename('MNDWI');
  
  // Return the MNDWI and cloudmasked image
  return image.select([]).addBands([masked, mndwi]);
}

// Filter collection and create MNDWI
var col = l8.filterBounds(roi1).filterDate('2020-01-01', '2022-12-31').map(preprocess);

// Vis
var vis = { min: -1, max: 1, palette: ['red', 'white', 'blue'] };

// Median composite
var median = col.median().clip(roi1);
Map.addLayer(median, { min: [0.1, 0.05, 0], max: [0.4, 0.3, 0.15], bands: ['B5', 'B6', 'B4'] }, 'Median Image');
Map.addLayer(median.select('MNDWI'), vis, 'Median MNDWI');

// Permanent water or river
var permanent = median.select('MNDWI').gt(0.4);
print(permanent, "permanent")
Map.addLayer(permanent.selfMask(), { palette: 'blue' }, 'Permanent water or River');

// Maximum composite
var max = col.reduce(ee.Reducer.percentile([98])).select('MNDWI_p98').clip(roi1);
print(max, "max")
Map.addLayer(max, vis, 'Max MNDWI');

// Wetland
var wetland = max.gt(0).and(permanent.eq(0));
print(wetland, "Wetland")
Map.addLayer(wetland.selfMask(), { palette: 'teal' }, 'Wetland');

// Calculating the wetland extension area
// We can now calculate the masked areas pixel area
var ndwiPixelArea =
    ee.Image.pixelArea().addBands(
        wetland.select('MNDWI_p98')).divide(1e6).reduceRegion({
            reducer: ee.Reducer.sum().group(1),
            geometry: roi1,
            scale: 10,
            bestEffort: true
});

var list = ee.List(ee.Dictionary(ndwiPixelArea).get('groups'));
var group0 = ee.Dictionary(list.get(0));
var ndwiWaterArea = ee.Number(group0.get('sum')).float();

print("Water area (km2):", ndwiWaterArea);

// Create legend to show the coastline year
var panel = ui.Panel([ui.Label('Legend')], ui.Panel.Layout.flow('vertical'), { position: 'bottom-right' });
[ { name: 'Waterbody', palette: 'blue' }, { name: 'Wetland', palette: 'teal' } ].map(function(dict, index){
  panel.add(ui.Panel(
    [
      ui.Label('', { width: '30px', height: '15px', backgroundColor: dict.palette, border: '0.5px solid grey' }),
      ui.Label(dict.name, { height: '15px' })
    ], 
    ui.Panel.Layout.flow('horizontal')
  ));
});
Map.add(panel);

//----------------------------Area Calculation--------------------------------------
//Select the class from the classified image
var tea = wetland.select('MNDWI_p98').eq(0);//vegetation has 0 value in my case
//Calculate the pixel area in square kilometer
var area_tea = tea.multiply(ee.Image.pixelArea()).divide(1000000);
//Reducing the statistics for your study area
var stat = area_tea.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry: roi1,
  scale: 30,
  maxPixels: 1e9
});
//Get the sq km area for Tea Plantation
print ('Tea Plantation Area (in sq.km)', stat);

