//India Climate Dashboard ---
//var India = ee.FeatureCollection("projects/ee-tm-engine-11/assets/india");
//Map.setOptions('HYBRID');
//Map.style().set('cursor', 'crosshair');
Map.centerObject(India, 5);
// Admin label
// Boundaries
//var text = require('users/gena/packages:text');
//var scale = Map.getScale() + 0.5
// var labels = India.map(function(feat){
//   feat = ee.Feature(feat)
//   var name = ee.String(feat.get("STATE"))
//   var centroid = feat.geometry().centroid()
//   var t = text.draw(name, centroid, scale, {
//   fontSize: 16,
//   fontType: 'Consolas',
//   textColor: 'black',
//   // outlineColor: 'white',
//   outlineWidth: 1,
//   outlineOpacity: 0.8
//   })
//   return t
// })
// var labels_final = ee.ImageCollection(labels)
// Admin boundaries
var boundVis = {fillColor: "#00000000", color: '#000000', width: 1.5};
var bound = India.style(boundVis);
// Add the admin boundaries
Map.addLayer(bound, {}, 'India', true);
//Map.addLayer(labels_final, {}, 'State Label', false)
var pollPanelAdded = false;
var styleBox = {
  padding: '0px 0px 0px 0px',
  width: '270px',
}
var styleH1 = {
  fontWeight: 'bold',
  fontSize: '20px',
  margin: '5px 5px 5px 5px',
  padding: '0px 0px 0px 0px',
  color: 'black'
}
var styleP = {
  fontSize: '12px',
  margin: '5px 5px',
  padding: '0px 0px 0px 0px'
}
var titletext = ui.Label({
  value: 'India Environmental Dashboard',
  style: styleH1//{color: 'Green', fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', padding: '5px'}
});
var subtitle = ui.Label({
  value: 'Welcome to the India Environmental Dashboard, a comprehensive tool showcasing real-time data on key environmental indicators. Explore and analyze critical insights to drive informed decisions for sustainable development.',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'blue'
  }
})
var txt = ui.Label({
    value: 'Climatic Parameters:',
    style: styleP
});
var layerSelect = ui.Select({
  items: ['Select Parameters', 'Elevation', 'Slope', 'Water Bodies', 'Air Quality', 'Land Surface Temperature (Day)', 'Land Surface Temperature (Night)', 'Land Use Land Cover', 'Koppen Classification', 'Temperature 2m', 'Precipitation', 'NDVI'],
  value: 'Select Parameters',
  style: styleBox
});
var txt1 = ui.Label({
    value: 'Air Quality Pollutants:',
    style: styleP
});
var polslect = ui.Select({
  items: ['Select Pollutants', 'CO', 'NO2', 'SO2', 'O3'], ///, 'tropospheric_HCHO'
  value: 'Select Pollutants',
  style: styleBox
});
var txt2 = ui.Label({
    value: 'Select Year:',
    style: styleP
});
var yearSelect = ui.Select({
  items: ['2018','2019','2020','2021','2022','2023'],
  value: '2018',
  style: styleBox
});
var txt3 = ui.Label({
 value: '',//'App Created By : Trinath Mahato and Sankar Jyoti Nath', 
 style:{fontSize:'12px',margin:'3px 5px'}});
var pollPanel = ui.Panel({
  widgets: [polslect],
  layout: ui.Panel.Layout.flow('horizontal')
});

var subtitle1 = ui.Label({
  value: 'Data Source:',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'red'
  }
});

var subtitle2 = ui.Label({
  value: '1. Elevation (NASA SRTM Digital Elevation 30m)',
  style: {
   // fontWeight: 'bold',
    fontSize: '12px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'black'
  }
});

var subtitle3 = ui.Label({
  value: '2. Slope (NASA SRTM Digital Elevation 30m)',
  style: {
   // fontWeight: 'bold',
    fontSize: '12px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'black'
  }
});

var subtitle4 = ui.Label({
  value: '3. Water Bodies (JRC Global Surface Water Mapping Layers, v1.4)',
  style: {
   // fontWeight: 'bold',
    fontSize: '12px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'black'
  }
});

var subtitle5 = ui.Label({
  value: '4. Atmospheric Pollutants (Sentinel-5P NRTI - Near Real Time)',
  style: {
   // fontWeight: 'bold',
    fontSize: '12px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'black'
  }
});

var subtitle6 = ui.Label({
  value: '5. LST Day & Night (MOD11A1.061 Terra Land Surface Temperature and Emissivity Daily Global 1km)',
  style: {
   // fontWeight: 'bold',
    fontSize: '12px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'black'
  }
});

var subtitle7 = ui.Label({
  value: '6. Land Use Land Cover (MCD12Q1.061 MODIS Land Cover Type Yearly Global 500m)',
  style: {
   // fontWeight: 'bold',
    fontSize: '12px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'black'
  }
});

var subtitle8 = ui.Label({
  value: '7. Koppen Classification (Global 1986 to 2010 5m)',
  style: {
   // fontWeight: 'bold',
    fontSize: '12px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'black'
  }
});

var subtitle9 = ui.Label({
  value: '8. ERA 5 - temperatuer 2m and Precipitation (ERA5-Land Monthly Aggregated - ECMWF Climate Reanalysis)',
  style: {
   // fontWeight: 'bold',
    fontSize: '12px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'black'
  }
});

var subtitle10 = ui.Label({
  value: '9. MODIS NDVI - Normalized Difference Vegetation Index (MYD13Q1.061 Aqua Vegetation Indices 16-Day Global 250m)',
  style: {
   // fontWeight: 'bold',
    fontSize: '12px',
    margin: '5px 5px 5px 5px',
    padding: '0px 0px 0px 0px',
    color: 'black'
  }
});

var txt4 = ui.Label({
  value: 'Select Atmospheric Pollutans Below After Selecting "Air Quality"',
  style: {fontSize:'12px',margin:'3px 5px', color: "green"}//{color: 'Green', fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', padding: '5px'}
});

function updateMapLayers(selectedLayer, selectedYear) {
Map.clear();
    // Example of layer update logic
    if (selectedLayer === 'Air Quality' && !pollPanelAdded) {
        panel.add(pollPanel); // Add the pollPanel if "Air Quality" is selected and it's not already added
        pollPanelAdded = true; // Update the flag
    } else if (selectedLayer !== 'Air Quality' && pollPanelAdded) {
        panel.remove(pollPanel); // Remove the pollPanel if the current selection is not "Air Quality" and it's added
        pollPanelAdded = false; // Update the flag
    }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                      ELEVATION
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (selectedLayer === 'Elevation') {
var dem = ee.Image("USGS/SRTMGL1_003").clip(India);
var palettes = require('users/gena/packages:palettes');
var elevPalette = palettes.colorbrewer.RdYlGn[11].reverse();
var elev1 = {min: -199, max: 8553, palette: elevPalette};
Map.addLayer(dem, elev1, 'Elevation in meters');
Map.addLayer(bound, {}, 'India Country', true);
/// Legend Elevation
 function makeLegend(elev1) {
  var lon1 = ee.Image.pixelLonLat().select('longitude');
  var gradient1 = lon1.multiply((elev1.max-elev1.min)/100.0).add(elev1.min);
  var legendImage1 = gradient1.visualize(elev1);
  var panel1 = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(elev1.min)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(1551)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(3301)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(5052)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(6802)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(elev1.max)
    ]
  });
  // Create legend title //
  var legendTitle1 = ui.Label({
    value: 'Elevation in meters',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  });
  var thumb1 = ui.Thumbnail({
    image: legendImage1, 
    params: {bbox:'0,10,100,8', dimensions:'356x15'}, 
    style: {padding: '0.5px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle1).add(thumb1).add(panel1);
} Map.add(makeLegend(elev1));
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                        SLOPE
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

else if (selectedLayer === 'Slope') {
var dem1 = ee.Image("USGS/SRTMGL1_003").clip(India);
var slope_deg = ee.Terrain.slope(dem1);
var palettes1 = require('users/gena/packages:palettes');
var SlopePalette = palettes1.colorbrewer.RdYlGn[11].reverse();
var SlopeV = {min: 0, max: 88, palette: SlopePalette};
Map.addLayer(slope_deg, SlopeV, 'Slope in degrees');
Map.addLayer(bound, {}, 'India Country', true);
/// Legend Slope  
 function makeLegend1(SlopeV) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((SlopeV.max-SlopeV.min)/100.0).add(SlopeV.min);
  var legendImage = gradient.visualize(SlopeV);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(SlopeV.min)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(17)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(35)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(52)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(70)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(SlopeV.max)
    ]
  });
  // Create legend title //
  var legendTitle = ui.Label({
    value: 'Slope in degrees',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,10,100,8', dimensions:'356x15'}, 
    style: {padding: '0.5px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
} Map.add(makeLegend1(SlopeV));
}
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                      WATERBODIES
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
else if (selectedLayer === 'Water Bodies') {
var waterBodies = ee.Image("JRC/GSW1_4/GlobalSurfaceWater").select('max_extent').clip(India);
var wateronly = waterBodies.selfMask();
var water_palette = ['blue'];
Map.addLayer(wateronly, {min: 0, max: 1, palette: water_palette},'Water Bodies');
Map.addLayer(bound, {}, 'India State', true);

var watercolor_color = [
  'blue'
  ],
Label_name = [
   'Water Bodies'
  ];

// Create the legend panel
var legendPanel = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    border: '1px solid black'
  }
});

// Legend title
var legendTitle3 = ui.Label({
  value: 'Water Bodies',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '50'
  }
});
legendPanel.add(legendTitle3);

Map.add(legendPanel);

function addLegendRow(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: 'blue',
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  var row = ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
  legendPanel.add(row);
}

// Adding legend rows
for (var i = 0; i < watercolor_color.length; i++) {
  addLegendRow(watercolor_color[i], Label_name[i]);
}
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                       Air Quality
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

else if (selectedLayer === 'Air Quality') {
    var pollutant = polslect.getValue();
    var visParams;
    var product;

    switch (pollutant) {
      case 'CO':
        product = "COPERNICUS/S5P/NRTI/L3_CO";
        visParams = {min: 0.0, max: 0.05, palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']};
        break;
      case 'NO2':
        product = "COPERNICUS/S5P/NRTI/L3_NO2";
        visParams = {min: 0.0, max: 0.0002, palette: ['black', 'blue', 'green', 'yellow', 'red']};
        break;
      case 'SO2':
        product = "COPERNICUS/S5P/NRTI/L3_SO2";
        visParams = {min: 0, max: 0.0008, palette: ['black', 'green', 'yellow', 'orange', 'red']};
        break;
      case 'O3':
        product = "COPERNICUS/S5P/NRTI/L3_O3";
        visParams = {min: 0.1000, max: 0.1355, palette: ['black', 'green', 'blue', 'yellow', 'red']};
    }
    
var styleBox2 = {
  padding: '0px 0px 0px 0px',
  width: '270px',
}

var yearSelect2 = ui.Select({
  items: ['2018','2019','2020','2021','2022','2023'],
  value: '2018',
  style: styleBox2
});
    //var selectedYear = yearSelect2.getValue();
    var startDate = selectedYear + '-01-01';
    var endDate = selectedYear + '-12-31';
    var dataset = ee.ImageCollection(product)
    .filterBounds(India)
    .select(pollutant + '_column_number_density')
    .filterDate(startDate, endDate).mean().clip(India);
               
    Map.addLayer(dataset, visParams, pollutant + ' over India ' + selectedYear);
    Map.addLayer(bound, {}, 'India Country', true);
    Map.add(makeAirPollutantLegend(visParams));
    
  function makeAirPollutantLegend(visParams) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((visParams.max - visParams.min) / 100.0).add(visParams.min);
  var legendImage = gradient.visualize({
    min: visParams.min, 
    max: visParams.max, 
    palette: visParams.palette
  });

  // Legend title
  var legendTitle = ui.Label({
    value: 'Column number density (mol/m^2)',
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      margin: '4px 8px',
      textAlign: 'center'
    }
  });

  // Thumbnail for the legend
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox: '0,10,100,8', dimensions: '160x20'}, 
    style: {padding: '8px', margin: '0 0 4px 0'}
  });

  // Min and Max labels for the legend
  var minLabel = ui.Label(String(visParams.min), {
    margin: '0 8px 0 0',
    fontSize: '12px'
  });

  var maxLabel = ui.Label(String(visParams.max), {
    margin: '0 0 0 8px',
    fontSize: '12px',
    textAlign: 'right'
  });

  // Horizontal panel to hold the min label, color bar thumbnail, and max label
  var colorBarPanel = ui.Panel({
    widgets: [minLabel, thumb, maxLabel],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      stretch: 'horizontal',
      padding: '0',
      margin: '0'
    }
  });

  // Main legend panel
  var legendPanel = ui.Panel({
    widgets: [legendTitle, colorBarPanel],
    style: {
      position: 'bottom-right',
      padding: '8px',
      border: '1px solid black',
      backgroundColor: '#FFF'
    }
  });
  return legendPanel;
}
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                Land Surface Temperature (DAY)
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////       

else if (selectedLayer === 'Land Surface Temperature (Day)') {
    
    //var selectedYear = yearSelect.getValue();
    var startDate = selectedYear + '-01-01';
    var endDate = selectedYear + '-12-31';

// Terra and Aqua Day time LST Daily Global 1km
var day_terra = ee.ImageCollection("MODIS/061/MOD11A1").filterBounds(India).select("LST_Day_1km").filterDate(startDate, endDate)
  .map(function(image) {return image.clip(India);}).mean().multiply(0.02).subtract(273.15);

// Get a palette: a list of hex strings
var palettes = require('users/gena/packages:palettes');
var terraDVP = palettes.colorbrewer.RdYlGn[11].reverse();
 
var terraDV = {min: -5, max:  45, palette: terraDVP};

Map.addLayer(day_terra, terraDV, 'Day time LST India');
Map.addLayer(bound, {}, 'India Country', true);

function makeLegend2(terraDV) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((terraDV.max-terraDV.min)/100.0).add(terraDV.min);
  var legendImage = gradient.visualize(terraDV);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(terraDV.min)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(5)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(15)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(25)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(35)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(terraDV.max)
    ]
  });
  // Create legend title //
  var legendTitle = ui.Label({
    value: 'Day time LST in degree celsius',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,10,100,8', dimensions:'356x15'}, 
    style: {padding: '0.5px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}

Map.add(makeLegend2(terraDV));
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                Land Surface Temperature (NIGHT)
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////  

else if (selectedLayer === 'Land Surface Temperature (Night)') {
    

    var selectedYear = yearSelect.getValue();
    var startDate = selectedYear + '-01-01';
    var endDate = selectedYear + '-12-31';
    print(startDate);
    print(endDate);

var night_terra = ee.ImageCollection("MODIS/061/MOD11A1")
  .filterBounds(India)
  .select("LST_Night_1km")
  .filterDate(startDate, endDate)
  //.filterDate("2022-01-01", "2022-12-31")
  .map(function(image) {return image.clip(India);})
  .mean().multiply(0.02).subtract(273.15);

// Get a palette: a list of hex strings
var palettes = require('users/gena/packages:palettes');
var terraNVP = palettes.colorbrewer.RdYlGn[11].reverse();
 
var terraNV = {min: -17, max: 30, palette: terraNVP};

Map.addLayer(night_terra, terraNV, 'Night time LST India');
Map.addLayer(bound, {}, 'India State', true);

function makeLegend3(terraNV) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((terraNV.max-terraNV.min)/100.0).add(terraNV.min);
  var legendImage = gradient.visualize(terraNV);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(terraNV.min)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(-7.6)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(1.8)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(11.2)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(20.6)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(terraNV.max)
    ]
  });
  // Create legend title //
  var legendTitle = ui.Label({
    value: 'Night time LST in degree celsius',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,10,100,8', dimensions:'356x15'}, 
    style: {padding: '0.5px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}

Map.add(makeLegend3(terraNV));
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                    Land Use Land Cover
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////    
  
else if (selectedLayer === 'Land Use Land Cover'){
     
var lulc_colors = ['05450a', '78d203', '1c0dff', 'c24f44', 'a5a5a5', 'fbff13'];

var lulcvis = {
  min: 1,	
  max: 6,
  palette: lulc_colors
};

var selectedYearLULC = yearSelect.getValue(); // Ensure this is correctly retrieving the year value
var lulcImage = ee.ImageCollection("MODIS/061/MCD12Q1")
                  .select("LC_Type1")
                  .filterDate(selectedYearLULC)
                  .first()
                  .clip(India); // Ensure 'India' is defined as a valid ee.Geometry or feature

// Re-classify the LULC data
lulcImage = lulcImage
              .where(lulcImage.gt(0).and(lulcImage.lte(9)),1) // Forest
              .where(lulcImage.gt(9).and(lulcImage.lte(10)),2) // Grass Land
              .where(lulcImage.gt(10).and(lulcImage.lte(11)),3) // Water Bodies
              .where(lulcImage.gt(11).and(lulcImage.lte(12)),4) // Crop Land
              .where(lulcImage.gt(12).and(lulcImage.lte(13)),5) // Built Up
              .where(lulcImage.gt(13).and(lulcImage.lte(14)),4) // Crop Land
              .where(lulcImage.gt(14).and(lulcImage.lte(16)),6) // Barren
              .where(lulcImage.gt(16),3); // Water Bodies

Map.addLayer(lulcImage, lulcvis, 'LULC', true);
Map.addLayer(bound, {}, 'India State', true);

var LULC_color = ['05450a', '78d203', '1c0dff', 'c24f44', 'a5a5a5', 'fbff13'],
    LABEL_name = ['Forest', 'Grass Land', 'Water Bodies', 'Crop Land', 'Built Up', 'Barren'];

// Create the legend panel
var legendPanel1 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    border: '1px solid black'
  }
});

// Legend title
var legendTitle1 = ui.Label({
  value: 'LULC Classes',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '50'
  }
});
legendPanel1.add(legendTitle1);

Map.add(legendPanel1);

function addLegendLULC(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color, // Correctly set background color
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  var row = ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
  legendPanel1.add(row);
}

// Adding legend rows
for (var i = 0; i < LULC_color.length; i++) {
  addLegendLULC(LULC_color[i], LABEL_name[i]);
}

}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                    KOPPEN CLASSIFICATION
  ///////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  
else if (selectedLayer === 'Koppen Classification'){
  
var image = ee.Image("users/fsn1995/Global_19862010_KG_5m").clip(India);
var koppenColor = [
  "FF0000", // 1
  "FF6E6E", // 2
  "FFCCCC", // 3
  "CC8D14", // 4
  "CCAA54", // 5
  "FFCC00", // 6
  "FFFF64", // 7
  "007800", // 8
  "005000", // 9
  "96FF00", // 11
  "BEBE00", // 14
  "8C8C00", // 15
  "5A5A00", // 16
  "820082", // 18
  "C800C8", // 19
  "BEBEBE", // 23
  "B464FA", // 26
  "C89BFA", // 27
  "6496FF", // 29
  "64FFFF", // 30
  ],
  koppenName = [ 
  'Am - Tropical Monsoon', // 1
  'As - Savanna Dry Summer', // 2
  'Aw - Savanna Dry Winter', // 3
  'BSh - Semi-arid Hot', // 4
  'BSk - Semi-arid Cold', // 5
  'BWh - Desert Hot', // 6
  'BWk - Desert Cold', // 7
  'Cfa - Humid Subtropical Hot Summer', // 8
  'Cfb - Oceanic Warm Summer', // 9
  'Csa - Mediterranean Hot Summer', // 11
  'Cwa - Subtropical Highland Hot Summer', // 14
  'Cwb - Subtropical Highland Warm Summer', // 15
  'Cwc - Subtropical Highland Cool Summer', // 16
  'Dfb - Humid Continental Warm Summer', // 18
  'Dfc - Subarctic Cool Summer', // 19
  'Dsc - Mediterranean Cool Summer', // 23
  'Dwb - Humid Continental Warm Summer (Monsoon)', // 26
  'Dwc - Subarctic Cool Summer (Monsoon)', // 27
  'EF - Ice Cap', // 29
  'ET - Tundra' // 30
  ]; 

var koppen = image.updateMask(image.lte(30));

Map.addLayer(koppen, {min: 0, max: 30, palette: koppenColor}, "India Koppen Classification");
Map.addLayer(bound, {}, 'India Country', true);

    var legend = ui.Panel({
      style: {
        position: 'bottom-right',
        padding: '8px 15px',
        border: '1px solid black'
      }
    });
   
    // Create legend title
    var legendTitle = ui.Label({
      value: 'Koppen Class',
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '0 0 4px 0',
        padding: '50'
      }
    });
  
    // Add the title to the panel
    legend.add(legendTitle);
  
    // Creates and styles 1 row of the legend.
    var makeRow = function(color, name) {
      // Create the color box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
  
      // Create the description label.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
  
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
    };
  
    // Add color and names to the legend
    for (var i = 0; i < 20; i++) {
      legend.add(makeRow(koppenColor[i], koppenName[i]));
    }  

    // Add legend to map
    Map.add(legend);

}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                     Temperature 2M
  ///////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

else if (selectedLayer === 'Temperature 2m') {
  
    //var selectedYear = yearSelect.getValue();
    var startDate09 = selectedYear + '-01-01';
    var endDate09 = selectedYear + '-12-31';
    
    var temp2m = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_AGGR").filterBounds(India).select('temperature_2m')
    .filterDate(startDate09, endDate09).mean().clip(India).subtract(273.15);

// Get a palette: a list of hex strings
var palettes4 = require('users/gena/packages:palettes');
var temp2mP = palettes4.colorbrewer.RdYlGn[11].reverse();
 
var temp2mPV = {min: -17, max: 35, palette: temp2mP};

Map.addLayer(temp2m, temp2mPV, 'LST Night India');
Map.addLayer(bound, {}, 'India Country', true);

function makeLegend4(temp2mPV) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((temp2mPV.max-temp2mPV.min)/100.0).add(temp2mPV.min);
  var legendImage = gradient.visualize(temp2mPV);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(temp2mPV.min)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(-6.6)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(3.8)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(14.2)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(24.6)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(temp2mPV.max)
    ]
  });
  // Create legend title //
  var legendTitle = ui.Label({
    value: 'Temperature 2m in degree celsius)',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,10,100,8', dimensions:'356x15'}, 
    style: {padding: '0.5px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}

Map.add(makeLegend4(temp2mPV));
  
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                       Precipitation
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

else if (selectedLayer === 'Precipitation') {
  
    //var selectedYear = yearSelect.getValue();
    var startDate10 = selectedYear + '-01-01';
    var endDate10 = selectedYear + '-12-31';
    
    var prec = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_AGGR").filterBounds(India).select('total_precipitation_sum')
    .filterDate(startDate10, endDate10).sum().clip(India);

var palettes5 = require('users/gena/packages:palettes');
var PreceP = palettes5.colorbrewer.RdYlGn[11].reverse();
 
var PrecePV = {min: 0, max: 12, palette: PreceP};

Map.addLayer(prec, PrecePV, 'Precipitation meters in India');
Map.addLayer(bound, {}, 'India Country', true);

function makeLegend5(PrecePV) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((PrecePV.max-PrecePV.min)/100.0).add(PrecePV.min);
  var legendImage = gradient.visualize(PrecePV);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(PrecePV.min)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(2.4)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(4.8)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(7.2)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(9.6)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(PrecePV.max)
    ]
  });
  // Create legend title //
  var legendTitle = ui.Label({
    value: 'Precipitation in meters',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,10,100,8', dimensions:'356x15'}, 
    style: {padding: '0.5px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}

Map.add(makeLegend5(PrecePV));
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  //                                             NDVI
  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

else if (selectedLayer === 'NDVI') {
  
    //var selectedYear = yearSelect.getValue();
    var startDate11 = selectedYear + '-01-01';
    var endDate11 = selectedYear + '-12-31';
    
    var ndvi = ee.ImageCollection("MODIS/061/MYD13Q1").filterBounds(India).select('NDVI')
    .filterDate(startDate11, endDate11).mean().clip(India).multiply(0.0001);

var palettes12 = require('users/gena/packages:palettes');
var ndviP = palettes12.colorbrewer.RdYlGn[11]//.reverse();
 
var ndviPV = {min: -1, max: 1, palette: ndviP};

Map.addLayer(ndvi, ndviPV, 'NDVI (Normalized Difference Vegetation Index)');
Map.addLayer(bound, {}, 'India Country', true);

function makeLegend6(ndviPV) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((ndviPV.max-ndviPV.min)/100.0).add(ndviPV.min);
  var legendImage = gradient.visualize(ndviPV);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(ndviPV.min)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(-0.6)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(-0.2)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(0.2)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(0.6)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(ndviPV.max)
    ]
  });
  // Create legend title //
  var legendTitle = ui.Label({
    value: 'NDVI (Normalized Difference Vegetation Index)',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px', 
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,10,100,8', dimensions:'356x15'}, 
    style: {padding: '0.5px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}

Map.add(makeLegend6(ndviPV));
}

  
} /// this curly bracket for the end of the "updateMapLayers" funtion

// Main panel
var panel = ui.Panel({
  widgets: [titletext, subtitle, txt, layerSelect, txt2, yearSelect, subtitle1, subtitle2, subtitle3, subtitle4, subtitle5, subtitle6, subtitle7, subtitle8, subtitle9, subtitle10, txt4],
  style:{margin: '12px', width: '320px', padding: '8px', position: 'bottom-right', border: '1px solid black', backgroundColor: '#FFF'}
});

ui.root.add(panel);

// Event handlers
layerSelect.onChange(function(value) {
  var selectedYear = yearSelect.getValue();
  updateMapLayers(value, selectedYear);
});

yearSelect.onChange(function(year) {
  var selectedLayer = layerSelect.getValue();
  updateMapLayers(selectedLayer, year);
});

polslect.onChange(function() {
  if (layerSelect.getValue() === 'Air Quality') {
    var selectedYear = yearSelect.getValue();
    updateMapLayers('Air Quality', selectedYear);
  }
});
