// Set up Express, Router, and import burgers.js

var express = require("express");

var router = express.Router();

var burgers = require("../models/burger.js");


// Set up paths

// All burgers

router.get("/", function(req, res){
    burgers.selectAll(function(data){
        var obj = {
            burgers: data
        };
        console.log(obj);
        res.render("index", obj);
    });
});

// Create a burger

router.post("/api/burgers", function (req, res){
    burgers.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (results) {
        res.json({ id: results.InsertId});
    });
});

// Update to devoured

router.put("/api/burgers/:id", function (req, res) {
    var update = "id = " + req.params.id;

    console.log("update", update);

    burgers.updateOne({
        devoured: req.body.devoured
    }, update, function (result){
        console.log(result);
        res.sendStatus(200);
    });
});

module.exports = router;