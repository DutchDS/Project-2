let slider_input = document.querySelector('input');                                                                    //assign the input from slider to variable a                                                                //assign the output under the slider to variable b

var last_DB_date = $("#selectDate").text();
console.log(last_DB_date)
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

var current_date = new Date('2020-01-27');

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

function task(i) { 
  setTimeout(function() {

    script_date = formatDate(current_date)
    document.getElementById("chartDate").innerHTML = "Chart Date:  " + script_date 
    geoUrl = "static/geojsons/" + script_date + ".json";
    // get_new_layer()
    // console.log(current_date)
    console.log(geoUrl)
  // call run
    get_new_layer(geoUrl);
  
    current_date.setDate(current_date.getDate() + 1);
    // current_date = current_date.setDate(current_date + 1);
    
    }  
  , 300 * i); 
} 

var geojson;
var legend;
function chooseColor(x) {
  // console.log("this is line 57")
  // console.log("--------------------------")
    if (x == 0)
      // color = "#fde8fc"
      color = "white"
      else if (x <= 50)
      color = "#f7a1f3"
    else if (x <= 100)
      color = "#f15be9"
    else if (x <= 500)
      color = "#eb14e0"
    else if (x <= 5000)
      color = "#a40e9d"
    else
      color = "#5e085a";
    // console.log(color)

  return (color)
  }

function get_new_layer(geoUrl) { 

      // Grab data with d3
  d3.json(geoUrl).then(function(data) {
    
    console.log("GEOJSON ", data)
    // Create a new choropleth layer
    geojson = new L.geoJson(data, {
      style: function(feature) {
        return {
          color: "white",
          // fillColor: "red",
          fillColor: chooseColor(feature.properties.confirmedCount), 
          fillOpacity: 0.8,
          weight: 1
        }},

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>Province:</strong> " + feature.properties.american_name 
                + "<hr><strong>Confirmed Cases: </strong>" + feature.properties.confirmedCount 
                // + "<br><strong>Suspected Cases: </strong>" + feature.properties.suspectedCount 
                + "<br><strong>Cured Cases: </strong>" + feature.properties.curedCount 
                + "<br><strong>Dead Cases: </strong>" + feature.properties.deadCount
      );
    }
  }).addTo(myMap);
});
}

function create_legend() {

var legend = L.control({ position: "bottomleft" });
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Corona Cases</h4>";
  div.innerHTML += '<i style="background: #fde8fc"></i><span>0</span><br>';
  div.innerHTML += '<i style="background: #f7a1f3"></i><span>1 - 50</span><br>';
  div.innerHTML += '<i style="background: #f15be9"></i><span>51 - 100</span><br>';
  div.innerHTML += '<i style="background: #eb14e0"></i><span>101 - 500</span><br>';
  div.innerHTML += '<i style="background: #a40e9d"></i><span>501 - 5000</span><br>';
  div.innerHTML += '<i style="background: #5e085a"></i><span>> 5000</span><br>';  

  return div;
};

legend.addTo(myMap);
}

create_legend()

for (var i = 0; i < 30; i++)  {  
  task(i); 
} 


slider_input.addEventListener('change', function () {                                                                   //using event listener with input gives instant response; use 'change' instead to see the difference in response
    var day_one;                                                                                            //declare our day_one variable which will represent the day one of outbreak
    day_one = moment("27/01/2020", "DD/MM/YYYY");                                                           //assigning our day one value 27 Jan 2020 to day_one using moment lib
    var slider_day = moment(day_one,"DD/MM/YYYY").add((slider_input.value-1),'day');                                   //manipulating the slider input with day_one value using moment, to get date for slider input
    get_date = moment(slider_day,"DD/MM/YYYY").format("YYYY-MM-DD");
    console.log(get_date)
    geoUrl = "static/geojsons/" + get_date + ".json";
 
    document.getElementById("chartDate").innerHTML = "Chart Date:  " + get_date
    console.log(geoUrl)
    get_new_layer(geoUrl);
}, false);