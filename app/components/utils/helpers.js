var axios = require("axios");

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper functions for making API Calls
var helper = {

    runQuery: function(searchTerm, startYear, endYear) {


        console.log(searchTerm)
        console.log(startYear)
        console.log(endYear)

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
            authKey + "&q=" + searchTerm + "&begin_date=" + startYear + "0101" +
            "&end_date=" + endYear + "0101";


        return axios.get(queryURL)
            .then(function(response) {
                //console.log(response.data.response);
                // If get get a result, return that result's formatted address property
                if (response.data.response.docs[0]) {

                    return response.data.response.docs;
                }
                // If we don't get any results, return an empty string
                return "";
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getSaved: function() {

        return axios.get('/api/saved')
            .then(function(results) {

                return results;
            })
    },

    // This function posts new searches to our database.
    postSaved: function(title, date, url) {

        var newArticle = { title: title, date: date, url: url };
        return axios.post('/api/saved', newArticle)
            .then(function(results) {
                return results._id;
            })

    },
    deleteSaved: function(title, data, url) {

        return axios.delete('/api/saved', {
                params: {
                    'title': title,
                    'data': data,
                    'url': url,
                }
            })
            .then(function(results) {
                return results;
            })
    }
};

// We export the API helper
module.exports = helper;
