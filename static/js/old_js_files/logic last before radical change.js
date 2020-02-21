// Creating map object
var myMap = L.map("map", {
  center: [36.8944, 104.1660],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
// var geoData = "static/data/Voter_Precincts.geojson";
var geoData = "static/geojsons/china.json";
var geojson;

var selected_day_data = [];
var selected_day_url = "static/data/df_2020-02-17.csv"

d3.csv(selected_day_url, function(data){
  console.log(data);
  selected_day_data = data;
  get_map_data(selected_day_data);
});
function getRecord(province, selected_day_data) {
  console.log(province)
  console.log(selected_day_data)  
  for (var i = 0; i < selected_day_data.length; i++) {
    console.log(selected_day_data[i])
    if (selected_day_data[i] == province) 
      console.log("selected_day_data[i]")
    return selected_day_data[i]
  }} ;
  // return selected_day_data.provinceName == '新疆维吾尔自治区'
 

function chooseColor(province, selected_day_data) {
  console.log(province);
  // var confirmedCount = getRecord(province).confirmedCount
  console.log(getRecord(province, selected_day_data));
  // console.log(confirmedCount);

  // switch (selected_day_data.provinceName) {
  // case "Brooklyn":
  //   return "yellow";
  // case "Bronx":
  //   return "red";
  // case "Manhattan":
  //   return "orange";
  // case "Queens":
  //   return "green";
  // case "Staten Island":
  //   return "purple";
  // default:
  //   return "black";
  // }
}

// Grab data with d3
function get_map_data(selected_day_data) {d3.json(geoData, function(data) {

  console.log(data.features);
  // console.log(data.features.properties.name);
  // Create a new choropleth layer
  L.geoJson(data, {
      
      style: function(feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.name, selected_day_data),
          fillOpacity: 0.5,
          weight: 1.5
        };
      }
  }).addTo(myMap);

  // Set up the legend
  // var legend = L.control({ position: "bottomright" });
  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "info legend");
  //   var limits = geojson.options.limits;
  //   var colors = geojson.options.colors;
  //   var labels = [];

  //   // Add min & max
  //   var legendInfo = "<h1>Number of State Reps</h1>" +
  //     "<div class=\"labels\">" +
  //       "<div class=\"min\">" + limits[0] + "</div>" +
  //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //     "</div>";

  //   div.innerHTML = legendInfo;

  //   limits.forEach(function(limit, index) {
  //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //   });

  //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   return div;
  // };

  // // Adding legend to the map
  // legend.addTo(myMap);
})};

