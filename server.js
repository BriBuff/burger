// Express Package
var express = require("express");

var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

// PORT

var PORT = process.env.PORT || 8080;

// Handlebars

var handlebars = require("express-handlebars");

app.engine("handlebars", handlebars({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

// Route

var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Localhost

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
})
