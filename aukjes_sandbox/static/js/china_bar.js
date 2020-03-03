var url = "/api/bar_china";

function get_data() {d3.json(url).then(function(response) {
    console.log("in the d3.json NEW part")
    console.log(response);
    create_chart(response)
})}

get_data();
console.log("went through the china_bar script")

function create_chart(bar_data) {   

    console.log(bar_data)
    bar_dates = []
    bar_confirmed = []
    bar_cured = []
    bar_dead = []

    for (var i in bar_data) {
        console.log(bar_data[i])
        bar_confirmed.push(bar_data[i].conf_count)
        bar_cured.push(bar_data[i].cured_count)
        bar_dates.push(bar_data[i].date)
        bar_dead.push(bar_data[i].dead_count)
    }

    console.log(bar_dates)
    console.log(bar_confirmed)
    console.log(bar_cured)
    console.log(bar_dead)


    x_values = bar_dates

    y_trace1 = bar_confirmed;
    y_trace2 = bar_cured;
    y_trace3 = bar_dead;

console.log(x_values)
console.log(y_trace1)

var trace1 = {
    x: x_values,
    y: y_trace1,
    name: "Confirmed",
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
        title: { text: "Virus spread over time",
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
            },
        yaxis: {fixedrange: true},
        xaxis: {fixedrange: true}
        
    };
    Plotly.newPlot("bar", barData, barLayout);
    console.log("Plot done")
}