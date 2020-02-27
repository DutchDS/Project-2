// var url = "/api/bar_china/file.json";
var url = "/api/bar_china";

function get_data() {d3.json(url).then(function(response) {
    console.log("in the d3.json NEW part")
    console.log(response);
    create_chart(response)
})}

get_data();
console.log("went through the china_bar script")

// THIS WORKS WITH VERSION 4, BUT ISN'T USING FLASK
// bar_data = {"date":{"0":"2020-01-26","1":"2020-01-27","2":"2020-01-28","3":"2020-01-29","4":"2020-01-30","5":"2020-01-31","6":"2020-02-01","7":"2020-02-02","8":"2020-02-03","9":"2020-02-04","10":"2020-02-05","11":"2020-02-06","12":"2020-02-07","13":"2020-02-08","14":"2020-02-09","15":"2020-02-10","16":"2020-02-11","17":"2020-02-12","18":"2020-02-13","19":"2020-02-14","20":"2020-02-15","21":"2020-02-16","22":"2020-02-17","23":"2020-02-18","24":"2020-02-19","25":"2020-02-20","26":"2020-02-21"},"confirmed":{"0":1812.0,"1":2081.0,"2":2858.0,"3":4633.0,"4":6095.0,"5":8150.0,"6":11230.0,"7":13831.0,"8":14525.0,"9":19690.0,"10":20540.0,"11":27434.0,"12":31180.0,"13":34293.0,"14":36895.0,"15":39824.0,"16":42718.0,"17":44742.0,"18":44767.0,"19":63935.0,"20":66413.0,"21":68586.0,"22":70639.0,"23":72531.0,"24":74280.0,"25":74675.0,"26":74690.0},"suspected":{"0":0.0,"1":0.0,"2":0.0,"3":0.0,"4":1.0,"5":0.0,"6":0.0,"7":0.0,"8":1.0,"9":0.0,"10":2.0,"11":0.0,"12":166.0,"13":0.0,"14":23710.0,"15":0.0,"16":0.0,"17":0.0,"18":0.0,"19":0.0,"20":0.0,"21":0.0,"22":0.0,"23":0.0,"24":0.0,"25":0.0,"26":0.0},"cured":{"0":49.0,"1":49.0,"2":56.0,"3":73.0,"4":120.0,"5":135.0,"6":70.0,"7":322.0,"8":435.0,"9":527.0,"10":718.0,"11":1115.0,"12":1537.0,"13":2004.0,"14":2599.0,"15":3216.0,"16":4060.0,"17":4778.0,"18":5066.0,"19":6809.0,"20":7987.0,"21":9550.0,"22":11049.0,"23":12838.0,"24":14571.0,"25":16254.0,"26":16749.0},"dead":{"0":55.0,"1":56.0,"2":82.0,"3":106.0,"4":133.0,"5":171.0,"6":258.0,"7":304.0,"8":305.0,"9":425.0,"10":426.0,"11":563.0,"12":637.0,"13":719.0,"14":808.0,"15":905.0,"16":1017.0,"17":1114.0,"18":1117.0,"19":1381.0,"20":1521.0,"21":1666.0,"22":1772.0,"23":1871.0,"24":2009.0,"25":2121.0,"26":2124.0}}
// create_chart(bar_data)

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

// x_values = [];

// y_trace1 = [];
// y_trace2 = [];
// y_trace3 = [];

// for (var key in bar_dates) {
//     x_values.push(bar_dates[key])
// }
// for (var key in bar_confirmed, bar_cured, bar_dead){
//     y_trace1.push(bar_confirmed[key])
//     y_trace2.push(bar_cured[key])
//     y_trace3.push(bar_dead[key])
// }


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
                    size: 32,
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