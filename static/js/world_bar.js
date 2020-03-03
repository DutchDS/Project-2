// var url = "/api/bar_china/file.json";
var url = "/api/bar_world";
var get_shape = d3.select("#selectShape");
var get_date = $("#selectDate").text();
var last_DB_date = $("#selectDate").text();

console.log(get_date)

function get_data(country) {d3.json(url).then(function(response) {
    console.log("in the d3.json NEW part")
    console.log(response);

    var shortShapes = []
    var today = new Date()
    // var yesterday =  formatDate(today.setDate(today.getDate() - 1));

    for (var i in response) {
        if (response[i].date == last_DB_date)
            shortShapes.push(response[i].country)
        }

    var chart_data = []   

    console.log(country)
    
    if (country == "all except China")
        chart_data = response
    else
        chart_data =  response.filter(response => {return response.country == country});

    console.log(shortShapes)        
    loadDropDowns("#selectShape",shortShapes,"Select Country");
    create_chart(chart_data)
})}

var country = 'all except China'

get_data(country);
console.log("went through the world_bar script")

function create_chart(bar_data) {   

    console.log(bar_data)
    bar_dates = []
    bar_confirmed = []
    bar_cured = []
    bar_dead = []

    for (var i in bar_data) {
        bar_confirmed.push(bar_data[i].conf_count)
        bar_cured.push(bar_data[i].cured_count)
        bar_dates.push(bar_data[i].date)
        bar_dead.push(bar_data[i].dead_count)
    }

    x_values = bar_dates

    y_trace1 = bar_confirmed;
    y_trace2 = bar_cured;
    y_trace3 = bar_dead;

console.log(x_values)
console.log(y_trace1)

var trace1 = {
    x: x_values,
    y: y_trace1,
    name: "Sick",
    type: "bar",
    marker: {
        color: '#f7a1f3'
      }
}
var trace2 = {
    x: x_values,
    y: y_trace2,
    name: "Cured",
    type: "bar",
    marker: {
        color: '#eb14e0'
      }
}
var trace3 = {
    x: x_values,
    y: y_trace3,
    name: "Dead",
    type: "bar",
    marker: {
        color: '#a40e9d'
      }
}

var barData = [trace1, trace2, trace3]
var barLayout = {
        barmode:"stack", 
        title: { text: "Virus spread over time for: " + country ,
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 24,
                    color: "white"
                    }
                },
        legend: {
            orientation: 'h',
            x: 0.25, 
            y: 1.15
                },
        paper_bgcolor: "#0e173d",
        font: {
            family: 'Arial, Helvetica, sans-serif',
            size: 16,
            color: "white"
            }
        

    };
    Plotly.newPlot("bar", barData, barLayout);
    console.log("Plot done")
}

function loadDropDowns(myId, myshortList, myText) {
    // var tbody = d3.select("tbody");
    var inputDate = d3.select(myId) 
   
    inputDate.html(" ");
  
    console.log(myshortList);
    var cell = inputDate.append("option").text(myText);
    
    myshortList.forEach((f) => {
    //   console.log(f);
      var cell = inputDate.append("option")
      cell.text(f);
  
      });
    };

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

    get_shape.on("change", function() {
        let inputValueShape = d3.select("#selectShape").property("value");
        country = inputValueShape
        console.log(country)
        get_data(country)});

