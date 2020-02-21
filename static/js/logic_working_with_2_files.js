// Creating map object
var myMap = L.map("map", {
  center: [36.8944, 104.1660],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
// var geoData = "static/data/Voter_Precincts.geojson";
var geoData = "static/geojsons/china.json";

var geojson;

// var selected_day_data = [];
var selected_day_url = "static/data/df_2020-01-26.csv"

function chooseColor(province, day_data) {
  
  console.log("--------------------------------------------")
  
  if (day_data.find(i => i.provinceName === province)) {
    // console.log("CORONA ", day_data);
    console.log("Province: ", province)
    var corona_conf = (day_data.find(i => i.provinceName === province).confirmedCount + 0);
    console.log("Confirmed: ", corona_conf)
    var corona_suspect = (day_data.find(i => i.provinceName === province).suspectedCount + 0);
    console.log("Suspected: ", corona_suspect)
    var corona_cured = (day_data.find(i => i.provinceName === province).curedCount + 0);
    console.log("Cured: ", corona_cured)
    var corona_dead = (day_data.find(i => i.provinceName === province).deadCount + 0);
    console.log("Dead: ", corona_dead)
    var american_name = day_data.find(i => i.provinceName === province).american_name
    console.log(american_name) }
  else {
    corona_conf = 0
    corona_suspect = 0
    corona_cured = 0
    corona_dead = 0 }
    x = corona_conf
  // var color = chooseColor(corona_conf)
    if (x == 0)
      color = "white"
    else if (x <= 100)
      color = "yellow"
    else if (x <= 1000)
      color = "orange"
    else if (x <= 10000)
      color = "red"
    else if (x <= 100000)
      color = "darkred"
    else
      color = "black";
    console.log(color)

  return (color)
  }

function get_new_layer() { 
  
  d3.csv(selected_day_url, function(day_data) {

  console.log(day_data);

    var selected_day_data = [];
    selected_day_data = day_data;

      // Grab data with d3
  d3.json(geoData, function(data) {
    
    console.log("GEOJSON ", data)
  
    // Create a new choropleth layer
    geojson = L.geoJson(data, {
  
      style: function(feature) {
        return {
          color: "white",
          // fillColor: "red",
          fillColor: chooseColor(feature.properties.name, selected_day_data), 
          fillOpacity: 0.8,
          weight: 1
        }},


    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>Province:</strong> " + feature.properties.name)
      ;
    }
    }).addTo(myMap);
});
})}

get_new_layer()
