////////////////////////////////////////////////////////////
////////////// Set All Variables ///////////////////////////
////////////////////////////////////////////////////////////

let slider_input = document.querySelector('input');                                                                    //assign the input from slider to variable a                                                                //assign the output under the slider to variable b
var last_DB_date = $("#selectDate").text();
var myMap = L.map("map", {
  center: [34.5133, -10.1629],
  zoom: 2
});
var today = new Date()
var yesterday =  today.setDate(today.getDate() - 1);
var current_date = new Date('2020-01-23');
var lastgeoUrl = "static/world_geojsons/" + last_DB_date + ".json";
var geojson;
var legend;


////////////////////////////////////////////////////////////
////////////// Define All Functions ////////////////////////
////////////////////////////////////////////////////////////

/// Function formatDate: Translate any date into a given string format ///
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

/// Function task: Build in a delay per map to give it time to load and complete before the next one starts  ///
function task(i) { 
  setTimeout(function() {
    script_date = formatDate(current_date)
    console.log(script_date)

    document.getElementById("chartDate").innerHTML = "Chart Date:  " + script_date
    geoUrl = "static/world_geojsons/" + script_date + ".json";
    
    console.log(geoUrl)
 
    get_new_layers(geoUrl);
  
    current_date.setDate(current_date.getDate() + 1);   
    }  
  , 500 * i); 
} 

/// Function 3: Colors used by map - need to match legend ///
function chooseColor(x) {
    if (x == 0)
      color = "transparent"
    else if (x >= 1 & x <= 5)
      color = "#f7a1f3"
    else if (x <= 50)
      color = "#f15be9"
    else if (x <= 500)
      color = "#eb14e0"
    else if (x <= 5000)
      color = "#a40e9d"
    else
      color = "#5e085a";
  return (color)
  }

// Function get_one_layer used to retrieve and plot one map chosen by slider date (all exisiting polylines need to be cleared) ///
function get_one_layer(geoUrl) { 

  d3.json(geoUrl).then(function(data) { 
    console.log("Plotting new layer")

    clear_polyline()

    geojson = L.geoJson(data, {
      style: function(feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.confirmedCount), 
          fillOpacity: 0.85,
          weight: 0.5
        }
      },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong> " + feature.properties.american_name + "</strong>"
                + "<hr><strong>Confirmed Cases: </strong>" + feature.properties.confirmedCount 
                + "<br><strong>Cured Cases: </strong>" + feature.properties.curedCount 
                + "<br><strong>Dead Cases: </strong>" + feature.properties.deadCount
      );
    }
  }).addTo(myMap);
});
}

/// Function get new layers: used when iterating over dates and yielding maps. Called by reload_maps()
function get_new_layers(geoUrl) { 

  d3.json(geoUrl).then(function(data) { 
    console.log("Plotting new layer")

    geojson = L.geoJson(data, {
      style: function(feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.confirmedCount), 
          fillOpacity: 0.85,
          weight: 0.5
        }
      },

    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong> " + feature.properties.american_name + "</strong>"
                + "<hr><strong>Confirmed Cases: </strong>" + feature.properties.confirmedCount 
                + "<br><strong>Cured Cases: </strong>" + feature.properties.curedCount 
                + "<br><strong>Dead Cases: </strong>" + feature.properties.deadCount
      );
    }
  }).addTo(myMap);
});
}

/// FUnction create_legend: used to plot the legend in the map. Colors and ranges need to match function chooseColor
function create_legend() {
    var legend = L.control({ position: "bottomleft" });
    legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Corona Cases</h4>";
      div.innerHTML += '<i style="background: #f7a1f3"></i><span>1 - 5</span><br>';
      div.innerHTML += '<i style="background: #f15be9"></i><span>6 - 50</span><br>';
      div.innerHTML += '<i style="background: #eb14e0"></i><span>51 - 500</span><br>';
      div.innerHTML += '<i style="background: #a40e9d"></i><span>501 - 5000</span><br>';
      div.innerHTML += '<i style="background: #5e085a"></i><span>> 5000</span><br>';  

      return div;
};

legend.addTo(myMap);
}

/// Function reload. Called by button Show Spread. Used to animate virus spread
function reload() {
  day_count = today - current_date
  counter = Math.ceil((day_count/24/60/60/1000/ + 1))
  for (var i = 0; i < counter; i++)  {  
    task(i); 
    } 
  }

/// FUnction clear_polyline: clears any exisiting polylines on map that exist  
function clear_polyline() {
  myMap.eachLayer(function (layer) {
    myMap.removeLayer(layer)
    }); 
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    }).addTo(myMap);
  } 

////////////////////////////////////////////////////////////
////////////// Execution Part  /////////////////////////////
////////////////////////////////////////////////////////////

/// Plot initial map layer /////////////////////////////////
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  }).addTo(myMap);
    
/// Add legend to the initial map //////////////////////////
create_legend()
document.getElementById("chartDate").innerHTML = "Chart Date:  " + last_DB_date 
    
/// Initial map retrieves the latest map in static/geojsons_world //////  
get_new_layers(lastgeoUrl);

/// Button Show Spread starts run of virus spread /////
d3.select("#selectAll").on("click", function() {
    // firstgeoUrl = "static/world_geojsons/" + current_date + ".json";
  clear_polyline()
  reload()});

/// Slider input adjusts map with matching geojson ////  
slider_input.addEventListener('change', function () {                                                                   //using event listener with input gives instant response; use 'change' instead to see the difference in response
    var day_one;                                                                                            //declare our day_one variable which will represent the day one of outbreak
    day_one = moment("22/01/2020", "DD/MM/YYYY");                                                           //assigning our day one value 27 Jan 2020 to day_one using moment lib
    var slider_day = moment(day_one,"DD/MM/YYYY").add((slider_input.value-1),'day');                                   //manipulating the slider input with day_one value using moment, to get date for slider input
    get_date = moment(slider_day,"DD/MM/YYYY").format("YYYY-MM-DD");
    console.log(get_date)
    geoUrl = "static/world_geojsons/" + get_date + ".json";

    console.log(geoUrl)
    document.getElementById("chartDate").innerHTML = "Chart Date:  " + get_date
    get_one_layer(geoUrl);
  }, false);

  day_count = today - current_date
  counter = Math.ceil((day_count/24/60/60/1000/ + 1))
  console.log(counter)
  console.log(today)

  console.log(current_date)
  var sliderselector = d3.select("#date_slider")
  sliderselector.attr("max",counter);