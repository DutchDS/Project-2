// read newsapi_key from config.js

console.log("newsapi_key: ", newsapi_key);

var url = 'http://newsapi.org/v2/top-headlines?' +
          'q=coronavirus&' +
          'from=2020-02-18&' +
          'to=2020-02-21&'
          'sortBy=relevancy&' +
          `apiKey=${newsapi_key}`;

var req = new Request(url);

var newsapi_file = "./newsapi.json";
fetch(req)
    .then(function(response) {
        console.log(response.json());

        // write the response to a .json file
        var fs = require("fs");
        fs.writeFile(newsapi_file, JSON.stringify(sampleObject, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
    })