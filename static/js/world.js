let slider_input = document.querySelector('input');                                                                    //assign the input from slider to variable a                                                                //assign the output under the slider to variable b

// Creating map object
var myMap = L.map("map", {
  center: [34.5133, -10.1629],
  zoom: 2
});
// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
}).addTo(myMap);

var current_date = new Date('2020-01-23');

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
    document.getElementById('selectDate').innerHTML = ""
    document.getElementById('selectDate').innerHTML = script_date 
    console.log(script_date)
    geoUrl = "static/world_geojsons/" + script_date + ".json";
    // get_new_layer()
    // console.log(current_date)
    console.log(geoUrl)
  // call run
    get_new_layer(geoUrl);
  
    current_date.setDate(current_date.getDate() + 3);
    // current_date = current_date.setDate(current_date + 1);
    
    }  
  , 1000); 
} 

var geojson;
var legend;
function chooseColor(x) {
  // console.log("this is line 57")
  // console.log("--------------------------")
    if (x == 0)
      // color = "#fde8fc"
      color = "transparent"
    else if (x <= 5)
      color = "#f7a1f3"
    else if (x <= 10)
      color = "#f15be9"
    else if (x <= 50)
      color = "#eb14e0"
    else if (x <= 500)
      color = "#a40e9d"
    else
      color = "#5e085a";
    // console.log(color)

  return (color)
  }

function get_new_layer(geoUrl) { 

  d3.json(geoUrl).then(function(data) {
    
    // console.log("GEOJSON ", data)
    // Create a new choropleth layer
    geojson = new L.geoJson(data, {
      style: function(feature) {
        return {
          color: "white",
          // fillColor: "red",
          fillColor: chooseColor(feature.properties.confirmedCount), 
          fillOpacity: 0.7,
          weight: 0.5
        }
      },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong> " + feature.properties.american_name + "</strong>"
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
      div.innerHTML += '<i style="background: #f7a1f3"></i><span>1 - 5</span><br>';
      div.innerHTML += '<i style="background: #f15be9"></i><span>6 - 10</span><br>';
      div.innerHTML += '<i style="background: #eb14e0"></i><span>11 - 50</span><br>';
      div.innerHTML += '<i style="background: #a40e9d"></i><span>51 - 500</span><br>';
      div.innerHTML += '<i style="background: #5e085a"></i><span>> 500</span><br>';  

      return div;
};

legend.addTo(myMap);
}

var today = new Date()
var yesterday =  today.setDate(today.getDate() - 1);

initgeoUrl = "static/world_geojsons/" + formatDate(yesterday) + ".json";
console.log(initgeoUrl)

get_new_layer(initgeoUrl);
create_legend()

function reload() {
  day_count = today - current_date
  counter = Math.ceil((day_count/24/60/60/1000/ + 1)/3)
  for (var i = 0; i < counter; i++)  {  
    task(i); 
    } 
  }
  
d3.select("#selectAll").on("click", function() {reload()});


slider_input.addEventListener('change', function () {                                                                   //using event listener with input gives instant response; use 'change' instead to see the difference in response
    var day_one;                                                                                            //declare our day_one variable which will represent the day one of outbreak
    day_one = moment("22/01/2020", "DD/MM/YYYY");                                                           //assigning our day one value 27 Jan 2020 to day_one using moment lib
    var slider_day = moment(day_one,"DD/MM/YYYY").add((slider_input.value-1),'day');                                   //manipulating the slider input with day_one value using moment, to get date for slider input
    get_date = moment(slider_day,"DD/MM/YYYY").format("YYYY-MM-DD");
    console.log(get_date)
    geoUrl = "static/world_geojsons/" + get_date + ".json";

    console.log(geoUrl)

    get_new_layer(geoUrl);
}, false);