var India = ee.FeatureCollection("projects/ee-tm-engine-11/assets/india")

print(India)

// Center of the map

Map.centerObject(India, 5)

// Title bar
Map.add(ui.Label('Monthly Average Earth Atmosphere Monitoring of India', {fontWeight: 'bold', fontSize: '28px'}));
    
// SYMBOLOGY
// Palette setting
var pal = require('users/gena/packages:palettes');
var Jet = pal.misc.jet[7]
var BrBG = pal.colorbrewer.BrBG[10].reverse()
var Ice = pal.cmocean.Ice[7]
var Inferno = pal.matplotlib.inferno[7]

// Aerosol Index
var aiVis = { 
  min: -1, 
  max: 2, 
  palette: Jet
};
// Density (CO - Carbon Monoxide)
var densVisCO = { 
  min: 0, 
  max: 0.05, 
  palette: Inferno
};
// Density (O3 - Ozone)
var densVisO3 = { 
  min: 0.1, 
  max: 0.16, 
  palette: Inferno
};

// Density (Formaldehyde - CH2O)
var densVisCH20 = { 
  min: 0, 
  max: 0.0003, 
  palette: Inferno
};
// Density (Nitrogen Dioxide - NO2)
var densVisN2O = { 
  min: 0, 
  max: 0.00045, 
  palette: Inferno
};
// Density (Sulfur Dioxide - SO2)
var densVisSO2 = { 
  min: 0, 
  max: 0.001, 
  palette: Inferno
};
// Mol Fraction (Methane)
var molfractVis = {
  min: 1700, 
  max: 2000, 
  palette: BrBG
};
// Cloud Fraction
var fractVis = {
  min: 0, 
  max: 1, 
  palette: Ice
};
// Boundaries
var boundVis = {fillColor: "#00000000", color: '#000000', width: 2};

// COLOR BAR
// Number of color bar
var nStepsR = 15;

// Color bar widget
function ColorBar(palette) {
  return ui.Thumbnail({ 
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, nStepsR, 0.5],
      dimensions: '100x5',
      format: 'png',
      min: 0,
      max: nStepsR,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}

// Admin label (Optional)

var text = require('users/gena/packages:text')

var scale = Map.getScale() + 0.5

var labels = India.map(function(feat){
  feat = ee.Feature(feat)
  var name = ee.String(feat.get("country"))
  var centroid = feat.geometry().centroid()
  var t = text.draw(name, centroid, scale, {
    fontSize: 10,
    textColor: 'white',
    outlineWidth: 0.5,
    outlineColor: 'black'
  })
  return t
})
var labels_final = ee.ImageCollection(labels)

// LEGEND STYLE
// Returns a labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend(title, vis) {
  var colorBar = ColorBar(vis.palette);
  
  var minLabel = vis.min.toString();
  var maxLabel = vis.max.toString();
  var midLabel = ((vis.min + vis.max) / 2).toFixed(2).toString(); // Compute the middle value and format it
  
  var labels = ui.Panel(
    [
      ui.Label(minLabel, {margin: '4px 8px'}),
      ui.Label(midLabel, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(maxLabel, {margin: '4px 8px'})
    ],
    ui.Panel.Layout.flow('horizontal')
  );
  
  return ui.Panel(
    [
      ui.Label(title, {fontWeight: 'bold'}),
      colorBar,
      labels
    ]
  );
}

// Styling for the legend title and footnote
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'left',
  margin: '4px',
};

var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '12px',
  stretch: 'horizontal',
  textAlign: 'left',
  margin: '4px',
};

// Assemble the legend panel
var legendPanel = ui.Panel(
  [
    ui.Label('Legend', LEGEND_TITLE_STYLE),
    makeLegend('Aerosol Index', aiVis),
    makeLegend('Column Number Density - CO - Carbon Monoxide (mol/m^2)', densVisCO),
    makeLegend('Column Number Density - O3 - Ozone (mol/m^2)', densVisO3),
    makeLegend('Column Number Density - CH20 - Formaldehyde (mol/m^2)', densVisCH20),
    makeLegend('Column Number Density - NO2 - Nitrogen Dioxide (mol/m^2)', densVisN2O),
    makeLegend('Column Number Density - SO2 - Sulfur Dioxide (mol/m^2)', densVisSO2),
    makeLegend('Column Volume Mixing Ratio Dry Air - CH4 - Methane (mole fraction)', molfractVis),
    makeLegend('Cloud Coverage (fraction)', fractVis),
    ui.Label('Source: Sentinel-5P (ESA Copernicus)', LEGEND_FOOTNOTE_STYLE),
  ],
  ui.Panel.Layout.flow('vertical'),
  {width: '300px', position: 'bottom-left'}
);

// Add the Panel to the map
Map.add(legendPanel);


// Strip time off current date
// First loaded data is 1 day before
var firstload = ee.Date(new Date().toISOString().split('T')[0]).advance(-1, 'day');
print(firstload);

// First date available to access via slider
var start_period = ee.Date('2019-01-01'); 

// Start and End
var startDate = start_period.getInfo();
var endDate = firstload.getInfo();

// Define initial date
var initialDate = firstload;

// Slider function
var dateSlider = ui.DateSlider({
  start: startDate.value, 
  end: endDate.value, 
  value: initialDate,
  period: 30, // 30-day granularity.
  style: {width: '350px', padding: '10px', position: 'bottom-right'},
  onChange: updateVisualization // Function to call when date changes.
});

// Create a panel to hold the date slider and the hour dropdown.
var dateTimePanel = ui.Panel({
  widgets: [dateSlider],
  layout: ui.Panel.Layout.flow('horizontal'), // Align widgets horizontally
  style: {position: 'bottom-right'}
});

Map.add(dateTimePanel);


// Function to update the visualization based on selected date and hour.
function updateVisualization() {
  // Remove previous layers
  Map.layers().reset();
  
  // Initial date
  var selectedDate = dateSlider.getValue();
  
  var selectedDateString = selectedDate.toString();
  var startDateString = selectedDateString.split(',')[0];
  var startDateTime = ee.Date(Number(startDateString));

  // Convert the selected date to an ee.Date
  var date = startDateTime;
  print(date, "startDateTime")
  // End date (weekly)
  var endDateTime = startDateTime.advance(1, 'Month');
  print(endDateTime, "endDateTime")
  // Admin boundaries
  var bound = India.style(boundVis);

  // Filter your collection by this time range and update the map
  // Load the specific image from the Sentinel-5P Carbon Monoxide
  var CO = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO");
  var filteredCO = CO.filterDate(startDateTime, endDateTime);
  var specificCO = filteredCO.select('CO_column_number_density').mean().clip(India);
  
  // Load the specific image from the Sentinel-5P Formaldehyde
  var HCHO = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_HCHO");
  var filteredHCHO = HCHO.filterDate(startDateTime, endDateTime);
  var specificHCHO = filteredHCHO.select('tropospheric_HCHO_column_number_density').mean().clip(India);
  
  // Load the specific image from the Sentinel-5P Nitrogen Dioxide
  var NO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2");
  var filteredNO2 = NO2.filterDate(startDateTime, endDateTime);
  var specificNO2 = filteredNO2.select('tropospheric_NO2_column_number_density').mean().clip(India);
  
  // Load the specific image from the Sentinel-5P Ozone
  var O3 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_O3");
  var filteredO3 = O3.filterDate(startDateTime, endDateTime);
  var specificO3 = filteredO3.select('O3_column_number_density').mean().clip(India);
  
  // Load the specific image from the Sentinel-5P Sulfur Dioxide
  var SO2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_SO2");
  var filteredSO2 = SO2.filterDate(startDateTime, endDateTime);
  var specificSO2 = filteredSO2.select('SO2_column_number_density').mean().clip(India);
  
  // Load the specific image from the Sentinel-5P UV Aerosol Index
  var AI = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_AER_AI");
  var filteredAI = AI.filterDate(startDateTime, endDateTime);
  var specificAI = filteredAI.select('absorbing_aerosol_index').mean().clip(India);
  
  // Load the specific image from the Sentinel-5P Methane
  var CH4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CH4");
  var filteredCH4 = CH4.filterDate(startDateTime, endDateTime);
  var specificCH4 = filteredCH4.select('CH4_column_volume_mixing_ratio_dry_air').mean().clip(India);
  
  // Load the specific image from the Sentinel-5P Cloud 
  var CL = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CLOUD");
  var filteredCL = CL.filterDate(startDateTime, endDateTime);
  var specificCL = filteredCL.select('cloud_fraction').mean().clip(India);

  // Display the datas
  Map.addLayer(specificCL, fractVis, 'Cloud Coverage', false);
  Map.addLayer(specificCH4, molfractVis, 'Methane (CH4)', false);
  Map.addLayer(specificSO2, densVisSO2, 'Sulfur Dioxide (SO2)', false);
  Map.addLayer(specificNO2, densVisN2O, 'Nitrogen Dioxide (NO2)', false);
  Map.addLayer(specificHCHO, densVisCH20, 'Formaldehyde (CH2O)', false);
  Map.addLayer(specificO3, densVisO3, 'Ozone (O3)', false);
  Map.addLayer(specificCO, densVisCO, 'Carbon Monoxide (CO)', false)
  Map.addLayer(specificAI, aiVis, 'Aerosol Index');
  
  // Add the admin boundaries
  Map.addLayer(bound, {}, 'India', true);
//  Map.addLayer(labels_final, {}, 'Label', false)
}


updateVisualization();
