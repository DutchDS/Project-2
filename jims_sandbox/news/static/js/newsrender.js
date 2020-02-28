
// =============================================
//  function to buled the news table banner
//  
function buildNewsTableBanner(dateStr, source) {
  console.log(`------ Enter buildNewsBanner datStr=${dateStr}, source=${source} -----`)
  var banner = d3.select("#news-banner");
  console.log("buildNewsTableBanner:", banner);
  banner
    .html("")
    .text(`Coronavirus news from ${source} for ${dateStr}`);

    console.log(`------ Exit buildNewsBanner datStr=${dateStr}, source=${source} -----`)
}

// =============================================
// build the news table header
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

// =============================================
// function to build the news table body
// loop through each report and add to the table
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

// =============================================
// function to render the news table body for a  specific date and news source
// reads file with specified path and name format
// filepath = ""./static/newsdata/<date>/<newsSourceID>_<dateStr>.json"
// example = "./static/newsdata/2020-02-24/bbc-news_2020-02-24.json"
function renderNewsForDate(dateStr, newsSourceId) {
  newsdirPath  = `/static/newsdata/${dateStr}/`;
  newsfileName = `${newsSourceId}_${dateStr}.json`;
  newsfilePath = newsdirPath + newsfileName
  console.log("News File: ", newsfilePath);

  d3.json(newsfilePath).then(function(newsData) {
    console.log(newsData);
    buildNewsTableBody(newsData.articles);
  });
}

// =============================================
// render the news banner with dateStr and news source name info
var newsSources = []
function renderNewsBanner(dateStr, newsSourceId) {
  newsapi_source_json = `/static/newsdata/newsapi_sources.json`;

  console.log("------ Enter renderNewsBanner -----")
  console.log("News Source names file: ", newsapi_source_json);
  console.log("News Sources array (1): ", newsSources);
 
  // if all else fails just set the make the news sourceName the same as newsSourceID
  var sourceName = newsSourceId;
 
  //convert news source id to a readable name
  if (!Array.isArray(newsSources) || !newsSources.length) {
    // newsSources array does not exist, is not an array, or is empty then 
    //  read json data for source metadata
    console.log("*** news source array is empty"); 
    
    d3.json(newsapi_source_json ).then(function(newsSrcs) {
      console.log(newsSrcs);
      newsSources = newsSrcs.sources;
      console.log("updated newsSources array (2): ", newsSources);

      result = newsSources.find(source => source.id === newsSourceId);
      if (result) { sourceName = result.name }

      // build the table banner with the dates tring and news source name
      buildNewsTableBanner(dateStr, sourceName);
    }); 
  } else {
    // newsSources has already been read in
    // convert the id to the name
    result = newsSources.find(source => source.id === newsSourceId);
    if (result) { sourceName = result.name }
    // build the table banner with the dates tring and news source name
    buildNewsTableBanner(dateStr, sourceName);
  }
  console.log("Current newsSources array (3): ", newsSources)

  console.log("------ Exit renderNewsBanner -----")
}

// =============================================
// listeners for date or news source selector change event
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

// =============================================
// Initalize the news table on entry
newsDate = "2020-02-27"
newsSrc = "bbc-news"

function initializeNewsTable(){
  buildNewsTableHeader();
  renderNewsBanner(newsDate, newsSrc);
  renderNewsForDate(newsDate, newsSrc);
} 

initializeNewsTable();
