// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require History Schema
var Article = require("./models/Article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nyreact");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


app.get('/api/saved', function(req, res) {

    Article.find({})
        .exec(function(err, doc) {

            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        })
});

app.post('/api/saved', function(req, res) {
    var newArticle = new Article(req.body);

    var title = req.body.title;
    var date = req.body.date;
    var url = req.body.url;

    newArticle.save(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc._id);
        }
    });
});

app.delete('/api/saved/', function(req, res) {

    var url = req.param('url');

    Article.find({ "url": url }).remove().exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send("Deleted");
        }
    });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
