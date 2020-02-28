
//
function buildNewsTableBanner(dateStr, source) {
  var banner = d3.select("#news-banner");
  console.log("buildNewsTableBanner:", banner);
  banner
    .html("")
    .text(`Coronavirus news from ${source} for ${dateStr}`);
}

function buildNewsTableHeader() {

  var thead = d3.select("#news-header");
  console.log("buildNewsTableHeader:", thead);

  thead.html("");
  var tr = thead.append("tr");

  tr.append("th")
    .attr("scope", "col")
    .text("#"); 

  tr.append("th")
    .attr("scope", "col")
    .text("Source");

  tr.append("th")
    .attr("scope", "col")
    .text("Title");
 
  tr.append("th")
    .attr("scope", "col")  
    .text("Image")
}


// function loop through each report and add to the table
function buildNewsTableBody(articles) {
  // Get a reference to the table body
  var tbody = d3.select("#news-body");
  // Clear table body
  tbody.html("")

  // loop through ech report and add to HTML table body
  var i = 0;
  articles.forEach((article) => {
    // console.log(article)
    var row = tbody.append("tr");
    
    // <th> cell for row number
    var th = row.append(th)
    i = i+1;
    th.attr("scope", "row")
      .text(i);
    // console.log(`appended a th ${i}`)

    // <td> cell for news soruce (e.g. BBC News>
    var cell = row.append("td");
    cell.attr('scope', 'row')
      .text(article.source.name);

    // <td> cell for Article Title </td>
    cell = row.append("td");
    cell.attr('scope', 'row')
      .html(`<a href=${article.url} target="_blank" > &nbsp${article.title}&nbsp </a>`)

    // <td> cell for image
    if(article.urlToImage) {
      cell = row.append("td");
      cell.attr('scope', 'row')
        .html(`<a href=${article.urlToImage} target="_blank" > <img src=${article.urlToImage} target="_blank" alt="" border=2 width=100 height="auto"/> </a>`);
    }
  });
}

// TEST Call to a newsapi json file to buils the HTML table for news.
// This will be replaced by a Date change event listener and read of the right json file for the date
// May also add selector for NEWS Source to listen for.
function renderNewsForDate(dateStr, newsSource) {
  newsdirPath  = `/static/newsdata/${dateStr}/`;
  newsfileName = `${newsSource}_${dateStr}.json`;
  newsfilePath = newsdirPath + newsfileName
  console.log("News File: ", newsfilePath);

  d3.json(newsfilePath).then(function(newsData) {
    console.log(newsData);
    buildNewsTableBody(newsData.articles);
  });
}

var newsSources = []
function renderNewsBanner(dateStr, newsSourceId) {
  newsapiSrcs = `/static/newsdata/newsapi_sources.json`;
  console.log("News Source names file: ", newsapiSrcs);
  var sourceName = newsSourceId;

  //convert news source id to a readable name
  if (!Array.isArray(newsSources) || !newsSources.length) {
    // newsSources array does not exist, is not an array, or is empty then 
    //  read json data for source metadata
    d3.json(newsapiSrcs).then(function(newsSrcs) {
      console.log(newsSrcs);
      newsSources = newsSrcs.sources;
      result = newsSources.find(source => source.id === newsSourceId);
      if (result) { sourceName = result.name }
    }); 
  } else {
    // newsSources has already been read in
    result = newsSources.find(source => source.id === newsSourceId);
  }

  // build the table banner with the datestring and news source name
  buildNewsTableBanner(dateStr, sourceName);
}

// =============================================
// Main  Set up
newsDate = "2020-02-27"
newsSrc = "bbc-news"
buildNewsTableHeader();

// Wrap this with an on Date Input (or Date Change) listener
renderNewsBanner(newsDate, newsSrc);
renderNewsForDate(newsDate, newsSrc);

d3.select("#corona-date").on("change", function() {
  newsDate = this.value
  renderNewsBanner(newsDate, newsSrc);
  renderNewsForDate(newsDate, newsSrc);
});

d3.select("#news_source").on("change", function() {
  newsSrc = this.value
  renderNewsBanner(newsDate, newsSrc);
  renderNewsForDate(newsDate, newsSrc);
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