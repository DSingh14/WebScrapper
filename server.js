
// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// set port for heroku
var PORT = process.env.PORT || 3000;
// initialize express
var app = express();
// require our routes
var routes = require("./routes");

// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public static folder
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// have every request go through our route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);
// Listen on the port
app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});