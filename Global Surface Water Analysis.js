// Import the JRC Global Surface Water Dataset (version 1.4)
var jrcWater = ee.Image("JRC/GSW1_4/GlobalSurfaceWater");

// Import the world shapefile
var worldShapefile = ee.FeatureCollection("projects/eecloudproject/assets/SHAPEFILES/World_SHP");

// List of bands available in the JRC dataset
var bands = [
  {label: 'Occurrence', value: 'occurrence'},
  {label: 'Absolute Change', value: 'change_abs'},
  {label: 'Normalized Change', value: 'change_norm'},
  {label: 'Seasonality', value: 'seasonality'},
  {label: 'Recurrence', value: 'recurrence'},
  {label: 'Transition', value: 'transition'},
  {label: 'Max Extent', value: 'max_extent'}
];

// Create the band selection dropdown
var bandSelect = ui.Select({
  items: bands.map(function(band) { return band.label; }),
  placeholder: 'Select Band',
  style: {width: '200px'},
  onChange: updateYearDropdown
});

// Create a list of years (1984 to current year)
var currentYear = new Date().getFullYear();
var years = ee.List.sequence(1984, currentYear).map(function(year) {
  return ee.String(ee.Number(year).format());
});

// Create a list of months
var months = ee.List.sequence(1, 12).map(function(month) {
  return ee.String(ee.Number(month).format('%02d'));
});

// Create the year dropdown
var yearSelect = ui.Select({
  items: years.getInfo(),
  placeholder: 'Select Year',
  disabled: true,
  style: {width: '200px'},
  onChange: updateMonthDropdown
});

// Create the month dropdown
var monthSelect = ui.Select({
  items: months.getInfo(),
  placeholder: 'Select Month',
  disabled: true,
  style: {width: '200px'},
  onChange: updateMap
});

// Function to create a legend
function createLegend(band) {
  var legend = ui.Panel({style: {padding: '8px', position: 'bottom-right'}});

  var legendTitle = ui.Label({
    value: 'Legend - ' + band.label,
    style: {fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0'}
  });

  legend.add(legendTitle);

  var colorPalette, legendLabels;

  if (band.value === 'occurrence' || band.value === 'recurrence') {
    colorPalette = ['white', 'blue'];
    legendLabels = ['0%', '100%'];
  } else if (band.value === 'change_abs' || band.value === 'change_norm') {
    colorPalette = ['red', 'white', 'blue'];
    legendLabels = ['-100%', '0%', '100%'];
  } else if (band.value === 'seasonality') {
    colorPalette = ['white', 'green'];
    legendLabels = ['0 months', '12 months'];
  } else if (band.value === 'transition') {
    colorPalette = ['#ffffff', '#0000ff', '#22b14c', '#d1102d', '#99d9ea', '#b5e61d', '#e6a1aa', '#ff7f27', '#ffc90e', '#7f7f7f', '#c3c3c3'];
    legendLabels = ['No change', 'Permanent', 'New Permanent', 'Lost Permanent', 'Seasonal', 'New Seasonal', 'Lost Seasonal', 'Seasonal to Permanent', 'Permanent to Seasonal', 'Ephemeral Permanent', 'Ephemeral Seasonal'];
  } else if (band.value === 'max_extent') {
    colorPalette = ['white', 'blue'];
    legendLabels = ['Not Water', 'Water'];
  }

  // Add color bar to legend
  for (var i = 0; i < colorPalette.length; i++) {
    var color = ui.Label({
      style: {
        backgroundColor: colorPalette[i],
        padding: '8px',
        margin: '0px'
      }
    });
    var description = ui.Label({
      value: legendLabels[i],
      style: {margin: '0px 0px 4px 6px'}
    });

    var legendRow = ui.Panel({
      widgets: [color, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });

    legend.add(legendRow);
  }

  return legend;
}

// Create the right-side legend panel
var legendPanel = ui.Panel({
  style: {width: '200px', position: 'bottom-right'}
});

// Create a panel to hold the dropdowns
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('JRC Global Surface Water Analysis', {fontSize: '24px', fontWeight: 'bold'}),
    ui.Label('Select Parameters', {fontSize: '18px', fontWeight: 'bold', margin: '10px 0 0 0'}),
    ui.Label('Step 1: Select Band'),
    bandSelect,
    ui.Label('Step 2: Select Year'),
    yearSelect,
    ui.Label('Step 3: Select Month'),
    monthSelect,
    ui.Label('Visualization will update based on your selection.', {color: 'gray'}),
    legendPanel
  ],
  style: {width: '300px', padding: '10px'}
});

// Add the control panel to the map
ui.root.insert(0, controlPanel);

// Function to update the year dropdown based on selected band
function updateYearDropdown(bandLabel) {
  var selectedBand;
  
  // Find the selected band using a loop instead of find
  for (var i = 0; i < bands.length; i++) {
    if (bands[i].label === bandLabel) {
      selectedBand = bands[i];
      break;
    }
  }

  if (selectedBand) {
    yearSelect.setDisabled(false); // Enable year dropdown
    legendPanel.clear();
    legendPanel.add(createLegend(selectedBand)); // Update the legend based on the selected band
  }
}

// Function to update the month dropdown based on selected year
function updateMonthDropdown(year) {
  if (year) {
    monthSelect.setDisabled(false); // Enable month dropdown
  }
}

// Function to update the map based on the selected band, year, and month
function updateMap(month) {
  var selectedBandLabel = bandSelect.getValue();
  var band;

  // Find the value of the selected band using a loop instead of find
  for (var i = 0; i < bands.length; i++) {
    if (bands[i].label === selectedBandLabel) {
      band = bands[i].value;
      break;
    }
  }

  var year = yearSelect.getValue();

  if (band && year && month) {
    // Get the selected band data from the JRC dataset
    var filteredWater = jrcWater.select(band);

    // Define visualization parameters based on the selected band
    var visParams;
    if (band === 'occurrence' || band === 'recurrence') {
      visParams = {min: 0, max: 100, palette: ['white', 'blue']};
    } else if (band === 'change_abs' || band === 'change_norm') {
      visParams = {min: -100, max: 100, palette: ['red', 'white', 'blue']};
    } else if (band === 'seasonality') {
      visParams = {min: 0, max: 12, palette: ['white', 'green']};
    } else if (band === 'transition') {
      visParams = {
        min: 0,
        max: 10,
        palette: ['#ffffff', '#0000ff', '#22b14c', '#d1102d', '#99d9ea', '#b5e61d', '#e6a1aa', '#ff7f27', '#ffc90e', '#7f7f7f', '#c3c3c3']
      };
    } else if (band === 'max_extent') {
      visParams = {min: 0, max: 1, palette: ['white', 'blue']};
    }

    // Add the selected data to the map
    Map.layers().set(0, ui.Map.Layer(filteredWater, visParams, selectedBandLabel + ' Visualization'));

    // Re-add the world shapefile to ensure it stays visible
    Map.addLayer(worldShapefile.style({color: 'black', fillColor: '00000000'}), {}, 'World Boundaries');
  }
}

// Initially add the world shapefile layer with a hollow fill and black border
Map.addLayer(worldShapefile.style({color: 'black', fillColor: '00000000'}), {}, 'World Boundaries');

// Set initial map center
Map.setCenter(0, 0, 2);
