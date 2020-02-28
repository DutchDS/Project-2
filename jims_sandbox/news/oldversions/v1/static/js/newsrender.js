
// function loop through each report and add to the table
function buildNewsTable(articles) {
  // Get a reference to the table body
  var tbody = d3.select("#news-body");
  // Clear table body
  tbody.html("")

  // loop through ech report and add to HTML table body
  articles.forEach((article) => {
    console.log(article)
    var row = tbody.append("tr");
    var cell = row.append("td");
    // cell.text(article.publishedAt);
    // cell = row.append("td");
    cell.text(article.source.name);
    cell = row.append("td");
    cell.html(`<a href=${article.url} target="_blank" > &nbsp${article.title}&nbsp </a>`)
    // cell.html(`${article.urlToImage} style="width:500px;height:600px;/>`);
    if(article.urlToImage) {
      cell = row.append("td");
      cell.html(`
        <a href=${article.urlToImage} target="_blank" >
          <img src=${article.urlToImage} target="_blank" alt="" border=2 width=100 height="auto"/>
        </a>`);
      // cell.html(`<img src="https://ichef.bbci.co.uk/news/624/cpsprodpb/5438/production/_111006512_060168457.jpg" alt="" border=2 width=100 height="auto"/>`);
    }
  });
}

// TEST Call to a newsapi json file to buils the HTML table for news.
// This will be replaced by a Date change event listener and read of the right json file for the date
// May also add selector for NEWS Source to listen for.
d3.json("./static/newsdata/2020-02-24/bbc-news_2020-02-24.json").then(function(newsData) {
// d3.json("./static/newsdata/2020-02-24/medical-news-today_2020-02-24.json").then(function(newsData) {
  // if (err) throw err;
  console.log(newsData);
  buildNewsTable(newsData.articles);
});


// DELETE THE REST OF THIS CODE AFTER FIGURE OUT HOW TO listen for a date change

// From UFO Project....
// // function loop through each report and add to the table
// function buildHTMLTable(reports) {
//   // Get a reference to the table body
//   var tbody = d3.select("tbody");
//   // Clear table body
//   tbody.html("")

//   // loop through ech report and add to HTML table body
//   reports.forEach((report) => {
//     // console.log(report)
//     var row = tbody.append("tr");
//     Object.entries(report).forEach(([key, value]) => {
//       var cell = row.append("td");
//       cell.text(value);
//     });
//   });
// }

// // build initial table from the data
// buildHTMLTable(tableData);


// // JavaScript code so the user can to set multiple filters and search for UFO sightings 
// // using the following criteria based on the table columns:
// // date/time
// // city
// // state
// // country
// // shape

// function filterbyDate(dataset, inDateStr) {
//   // initialize filterdData array
//   var filteredData = [];

//   // parse the date and check to see if valid date
//   var parseDate = d3.timeParse("%m/%d/%Y");
//   var inputDate = parseDate(inDateStr);
 
//   if (inputDate !== null) {
//     console.log(`${inDateStr} parsed to datetime: ${inputDate}`);

//     // filter table by date-time that is taken from inputvalue.
//     // var filteredData = tableData.filter(report => (parseDate(report.datetime) == inputDate));
//     filteredData = 
//       dataset.filter(report => (parseDate(report.datetime).getTime() === inputDate.getTime()));

//     // console.log(filteredData);
    
//   } else {
//     console.log(`INPUT ERROR: Invalid date entered: ${inDateStr}`)
//   }

//   return filteredData
// }

// // Select the button
// var button = d3.select("#filter-btn");

// button.on("click", function() {

//   // initialize the result data to be the complete table.  then filter down
//   var results= tableData;
  
//   // Get the value property of the input datetime,
//   // Filter by Date if present
//   // city, state, country, shape elements
//   var inDateStr = d3.select("#datetime").property("value");
//   if (inDateStr !== "") {
//     console.log(`Filter by date: [${inDateStr}]`)
//     results = filterbyDate(results, inDateStr);
//   }

//   // Get the value property of the input city,
//   // Filter by city if present
//   var inCity = d3.select("#city").property("value").toLowerCase();
//   if (inCity !== "") {
//     console.log(`Filter by city: [${inCity}]`)
//     results = results.filter(report => (report.city === inCity)); 
//   }

//   // Get the value property of the input state,
//   // Filter by state if present
//   var inState = d3.select("#state").property("value").toLowerCase();
//   if (inState !== "") {
//     console.log(`Filter by state: [${inState}]`)
//     results = results.filter(report => (report.state === inState)); 
//   } 

//   // Get the value property of the input country,
//   // Filter by country if present
//   var inCountry = d3.select("#country").property("value");
//   if (inCountry !== "") {
//     console.log(`Filter by country: [${inCountry}]`)
//     results = results.filter(report => (report.country === inCountry)); 
//   } 

//   // Get the value property of the input datetime shape,
//   // Filter by shape if present
//   var inShape = d3.select("#shape").property("value");
//   if (inShape !== "") {
//     console.log(`Filter by shape: [${inShape}]`)
//     results = results.filter(report => (report.shape === inShape)); 
//   } 

//   // build the HTML for resulting filtered table  
//   buildHTMLTable(results);

// });