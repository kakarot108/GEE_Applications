var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2023-01-01', '2023-04-30')
  .map(function(image) {return image.clip(table);});
  
print(collection, "JH_CO");

var startDate = '2023-01-01'
var endDate = '2023-04-30'
var months = ee.List.sequence(1, 4);
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

var CO_Monthly = modis_YrMo.toBands(); ///// Stacking Process

print(CO_Monthly, "Daily CO") /// Printing


Export.image.toDrive({
   image: CO_Monthly,
   description: 'Monthly_CO_2023_Jharkhand',
   scale: 1113.2,
   region: table,
   folder : 'JH_AIR_Q',
    fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  },
   maxPixels: 1e13,
});
