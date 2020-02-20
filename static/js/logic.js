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

function chooseColor(x) {
    console.log(x);
    if (x == 0)
      color = "white"
    else if (x <= 100)
      color = "yellow"
    else if (x <= 1000)
      color = "orange"
    else if (x <= 10000)
      color = "red"
    else if (x <= 100000)
      color = "purple"
    else
      color = "black";
    console.log(color)
    return color
  }

function get_record(province) { d3.csv(selected_day_url, function(day_data) {

  // console.log("CORONA ", day_data);
  console.log(province)
  // if (day_data.find(i => i.provinceName === province).confirmedCount)
  var found_record = (day_data.find(i => i.provinceName === province).confirmedCount + 0);
  // if (day_data.find(i => i.provinceName === province).confirmedCount)
  console.log(found_record)
    // var color = 
    // console.log(color)
  return chooseColor(found_record)
});
}


// Grab data with d3
d3.json(geoData, function(data) {

  console.log("GEOJSON ", data)

  // Create a new choropleth layer
  geojson = L.geoJson(data, {

    style: function(feature) {
      return {
        color: "white",
        fillColor: "red",
        fillColor: get_record(feature.properties.name), 
        fillOpacity: 0.5,
        weight: 1.5
      }},


    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>Province:</strong> " + feature.properties.name)
      ;
    }
    }).addTo(myMap);
});
