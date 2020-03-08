// vars to hold selected news source and date
var newsSrc;
var newsDate;

// hold the newsSrcPromise with D3.json
var newsapi_source_json = `/static/newsdata/newsapi_sources.json`;
var newsSrcPromise = d3.json(newsapi_source_json );

// dates to select from
dates = [
  '2020-03-08',
  '2020-03-07',
  '2020-03-06',
  '2020-03-05',
  '2020-03-04',
  '2020-03-03',
  '2020-03-02',
  '2020-03-01',
  '2020-02-29',
  '2020-02-28',
  '2020-02-27',
  '2020-02-26',
  '2020-02-25',
  '2020-02-24',
  '2020-02-23',
  '2020-02-22',
  '2020-02-21',
  '2020-02-20',
  '2020-02-19',
  '2020-02-18',
  '2020-02-17',
  '2020-02-16',
  '2020-02-15',
  '2020-02-14',
  '2020-02-13',
  '2020-02-12',
  '2020-02-11',
  '2020-02-10',
  '2020-02-09',
  '2020-02-08',
  '2020-02-07',
  '2020-02-06',
  '2020-02-05',
  '2020-02-04',
  '2020-02-03',
  '2020-02-02',
  '2020-02-01',
  '2020-01-31',
  '2020-01-30',
  '2020-01-29',
  '2020-01-28',
  '2020-01-27',
  '2020-01-26',
  '2020-01-25',
  '2020-01-24',
  '2020-01-23',
  '2020-01-22',
  '2020-01-21',
  '2020-01-20',
  '2020-01-19',
  '2020-01-18',
  '2020-01-17',
  '2020-01-16',
  '2020-01-15',
  '2020-01-14',
  '2020-01-13',
  '2020-01-12',
  '2020-01-11',
  '2020-01-10',
  '2020-01-09',
  '2020-01-08',
  '2020-01-07',
  '2020-01-06',
  '2020-01-05',
  '2020-01-04',
  '2020-01-03',
  '2020-01-02',
  '2020-01-01',
  '2019-12-31'
  ]

// news source ids to select from
  newssrc_ids= [
    'abc-news',
    'al-jazeera-english',
    'associated-press',
    'bbc-news',
    'bloomberg',
    'breitbart-news',
    'business-insider',
    'cbs-news',
    'cnbc',
    'cnn',
    'fortune',
    'fox-news',
    'medical-news-today',
    'msnbc',
    'national-geographic',
    'national-review',
    'nbc-news',
    'new-scientist',
    'newsweek',
    'politico',
    'reuters',
    'the-globe-and-mail',
    'the-hill',
    'the-huffington-post',
    'the-wall-street-journal',
    'the-washington-post'
  ]

// =============================================
//  function to initalize the news table selectors
//  date seletor and news source selectr
function buildNewsTableSelectors() {
  // 1.  set up the news source selector
  var newsselector = d3.select("#news_source");
  newsselector.html("");

  // add a default initial option to choose a news source
  newsselector.append("option")
    .attr("hidden", true)
    .attr("selected", true)
    .attr("value","")
    .text(" ---- Choose a News Source ---")

  newsSrcPromise.then(function(newsSrcs) {
    console.log("buildNewsTableSelectors newsSrcs", newsSrcs);
    newsSources = newsSrcs.sources;

    newssrc_ids.forEach(newsSourceId => {
      var sourceName = "";
      result = newsSources.find(source => source.id === newsSourceId);
      if (result) { sourceName = result.name }
      else { sourceName = newsSourceID };

      newsselector.append("option")
        .attr("value", newsSourceId)
        .text(sourceName);

    });

    // set no option selected
    // newsselector.selectedIndex = -1;
  }); 

  // 2. set up the date selector with date options
  var dateselector = d3.select("#corona-date")
  dateselector.html("");
  
  // add a default initial option to choose a date
  dateselector.append("option")
    .attr("hidden", true)
    .attr("selected", true)
    .attr("value","")
    .text(" ---- Choose a Date ---")

  dates.forEach(dateStr => {
    dateselector.append("option")
      .attr("value", dateStr)
      .text(dateStr);
  }); 

  // set no option selected
  // dateselector.selectedIndex = -1;
}

// =============================================
//  function to build the news table banner
//  
function buildNewsTableBanner(dateStr, source) {
  console.log(`buildNewsBanner(${dateStr}, ${source})`);
  // var banner = d3.select("#news-banner");
  // var parentdiv = banner.select(function() { return this.parentNode; })

  var parentdiv = d3.select("#news-banner");
  console.log("buildNewsTableBanner, parentdiv", parentdiv);

  parentdiv 
    .html("")
    .append("h3")
    .html(`Coronavirus news from ${source} <br> for ${dateStr}`)
    .attr('style', 'text-align: center');

  // required newsapi.org attribution https://newsapi.org/terms
  // get the parent div of the banner 

  parentdiv
    .append('p')
    .text('Powered by News Api  ')
    .attr('style', 'text-align: right')
    .append('a')
    .attr('href', 'https://newsapi.org')
    .text('https://newsapi.org');

    // console.log(`------ Exit buildNewsBanner datStr=${dateStr}, source=${source} -----`)
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
      .html(`<h5><a href=${article.url} target="_blank" > &nbsp${article.title}&nbsp </a></h5>`)

    // <td> cell for image
    if (article.urlToImage && (article.urlToImage != "null")) {
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

    console.log("renderNewsForDate(): ", newsData);
    buildNewsTableBody(newsData.articles);

  }).catch(function(error) {

    console.log("renderNewsForDate() caught json fetch exception: ", error);
    console.log("-- to handle: building empty news table")
    buildNewsTableBody([]);

  });
}

// =============================================
// render the news banner with dateStr and news source name info
function renderNewsBanner(dateStr, newsSourceId) {
  // newsapi_source_json = `/static/newsdata/newsapi_sources.json`;
  console.log(`renderNewsBanner(${dateStr}, ${newsSourceId})`)
    var sourceName = "";
    newsSrcPromise.then(function(newsSrcs) {
      // console.log("renderNewsBanner newsSources: ", newsSrcs);
      var newsSources = newsSrcs.sources;

      result = newsSources.find(source => source.id === newsSourceId);
      if (result) { sourceName = result.name }
      else { sourceName = newsSourceID };

      // build the table banner with the dates tring and news source name
      buildNewsTableBanner(dateStr, sourceName);
    }); 
}

// =============================================
// listeners for date or news source selector change event
function addListeners() {
  const slider_input = document.querySelector('input');
  const newsDateSelect = d3.select("#corona-date");
  const newsSrcSelect = d3.select("#news_source");

  // add listener to handle change on the news date selector
  newsDateSelect.on("change", function() {
    newsDate = this.value   // get the new date
    newsSrc = newsSrcSelect.property('value');  // get the currently selected news source
    
    console.log("#corona-date selector value change, (this.value) : ", this.value);
    console.log("#corona-date  selector value change, property(value): ", d3.select('#corona-date').property('value'));
  
    // render an updated banner and body of the news table
    renderNewsBanner(newsDate, newsSrc);
    renderNewsForDate(newsDate, newsSrc);
  });
  
  // add listener to hande change on the news source selector
  // https://stackoverflow.com/questions/14749182/how-to-register-multiple-external-listeners-to-the-same-selection-in-d3
  newsSrcSelect.on("change.news", function() {
    newsSrc = this.value  // get the new news source
    newsDate = newsDateSelect.property('value') // get the currently selected news date
  
    // console.log("#news_source selector value change, (this.value) : ", this.value);
    // console.log("#news_source selector value change, property(value): ", d3.select('#news_source').property('value'));
  
    // render an updated banner and body of the news table
    renderNewsBanner(newsDate, newsSrc);
    renderNewsForDate(newsDate, newsSrc);
  });

  // add listener for time slider date change using 'input' event
  slider_input.addEventListener('input', function () {  
    console.log("slider event listner value:", this.value);
    console.log("slider day_one", day_one);
    console.log("slider_day", slider_day);

    // note 1: day_one is a global variable set by slider_china.js or slider_world.js
    //         e.g. for china  day_one = moment("27/01/2020", "DD/MM/YYYY"); 
    //         e.g. for world  day_one = moment("22/01/2020", "DD/MM/YYYY"); 
    // note 2: "moment()" is from moment.js library that Vamsi referenced and loaded to help with manipulating date objecs
    // note 3: mySliderDate will be a string in the form of "YYYY-MM-DD" (e.g. "2020-02-28"). 
    //         Use the moment() call below to change this format to what is needed for update logic

    mySliderDate = moment(day_one,"DD/MM/YYYY")
      .add((this.value-1),'day')  // calculate what date is selected
      .format("YYYY-MM-DD");      // format the date as 'YYYY-MM-DD'

    console.log("mySliderDate", mySliderDate);

    // newsrender handles the time slider date change by
    // 1.  setting the date value seleted in the newsDate selecter
    // 2.  triggering a change event on the newsDate selector 
    //     so that listner can react and update the news table
    newsDateSelect
      .property('value', mySliderDate)
      .dispatch('change');  

  }, false);
}

// =============================================
// Initalize the news table on entry


function initializeNewsTable() {
  buildNewsTableHeader();
  buildNewsTableSelectors();

  var initialDate = "2020-03-03"
  var initialSrc = "bbc-news"

  addListeners();

  newsSrcPromise.then(function(newsSrcs) {

    d3.select('#corona-date')
      .property('value', initialDate);  // Set the date in newstable selector
  
    d3.select('#news_source')
      .property('value', initialSrc)   // Set the news source in newstable selector
      .dispatch('change');     // trigger change event so on("change") listener will react
  });

  // renderNewsBanner(initialDate, initialSrc);
  // renderNewsForDate(initialDate, initialSrc);
} 

initializeNewsTable();

