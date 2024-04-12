
Map.addLayer(table)
var collection = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_AER_AI")
  .select('absorbing_aerosol_index')
  .filterDate('2018-08-01', '2019-12-31')
  .map(function(image) {return image.clip(table);});
  
print(collection, "JH_CO"); 

var startDate = '2018-08-01'
var endDate = '2019-12-31'
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(ee.Number(ee.Date(startDate).get("year")), 
                             ee.Number(ee.Date(endDate).get("year")));

// Map filtering and reducing across year-month combinations and convert to ImageCollection
var modis_YrMo = ee.ImageCollection.fromImages(
  years.map(function (y) {
        return months.map(function (m) {
            return collection
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .filter(ee.Filter.calendarRange(m, m, 'month'))
              .mean()
              .set('year',y)
              .set('month',m)
        });
    }).flatten()).map(function(image) {return image.clip(table);});

print(modis_YrMo, 'MONTHLY')

var AI_Monthly = modis_YrMo.toBands(); ///// Stacking Process

print(AI_Monthly, "Monthly AI") /// Printing

/// Daily Data Band Wise (Stacking)


/*var band_viz = {
  min: 0,
  max: 0.05,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

var coll = collection.mean();
print(coll, "Carbon Monoxide");
Map.addLayer(coll, band_viz, 'S5P CO');
Map.centerObject(table, 9);*/

Export.image.toDrive({
   image: AI_Monthly,
   description: 'Monthly_AI_2018_19_India',
   scale: 1113.2,
   region: table,
   folder : 'India_AIR_Q',
    fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  },
   maxPixels: 1e13,
});
