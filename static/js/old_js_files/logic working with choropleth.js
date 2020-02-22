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
// var geoData = "static/geojsons/china.json";
// var geoUrl = "static/geojsons/2020-02-19.json";
var geojson;
var current_date = new Date('2020-01-27');

// add a day

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function chooseColor(x) {
  
  console.log("--------------------------")
    if (x == 0)
      color = "fde8fc"
    else if (x <= 50)
      color = "f7a1f3"
    else if (x <= 100)
      color = "f15be9"
    else if (x <= 500)
      color = "eb14e0"
    else if (x <= 10000)
      color = "a40e9d"
    else
      color = "5e085a";
    console.log(color)

  return (color)
  }

function get_new_layer(geoUrl) { 

      // Grab data with d3
  d3.json(geoUrl, function(data) {
    
    console.log("Now processing: ", geoUrl)
    console.log("GEOJSON ", data)
    // Create a new choropleth layer
    geojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "confirmedCount",
  
      // Set color scale
      scale: ["#fde8fc", "#8d0c86"],
  
      // Number of breaks in step range
      steps: 7,
  
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
  
      
    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>Province:</strong> " + feature.properties.american_name 
                + "<hr><strong>Confirmed Cases: </strong>" + feature.properties.confirmedCount 
                + "<br><strong>Suspected Cases: </strong>" + feature.properties.suspectedCount 
                + "<br><strong>Cured Cases: </strong>" + feature.properties.curedCount 
                + "<br><strong>Dead Cases: </strong>" + feature.properties.deadCount
      );
    }
  }).addTo(myMap);
    // Set up the legend



});


}

function run(geoUrl) {    
  // run this code

  setTimeout(afterTwoSeconds(geoUrl), 500);    
}

function afterTwoSeconds(geoUrl) {  
  get_new_layer(geoUrl)  
  // run this code two seconds after executing run.   
}

function task(i) { 
  setTimeout(function() {

    script_date = formatDate(current_date)
     
    geoUrl = "static/geojsons/" + script_date + ".json";
    // get_new_layer()
    // console.log(current_date)
    console.log(geoUrl)
  // call run
  run(geoUrl);
  
    
  
    current_date.setDate(current_date.getDate() + 1);
    // current_date = current_date.setDate(current_date + 1);
    
    }  
  , 2000 * i); 
} 

for (var i = 0; i < 26; i++)  { 
  task(i); 
} 

