// mySQL connection
var connection = require("../config/connection.js");

// SQL Syntax "Converter"

// 

function questionMark (num) { 
    var array = [];

    for (var i = 0; i < num; i++) {
        array.push("?");
    }

    return array.toString();

}

// Convert object key/value pairs to mySQL

function objSQL(ob) {
    var array = [];

    for (var key in ob) {
        var val = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof val === "string" && val.indexOf(" ") >= 0 ) {
                val = "'" + val + "'";
            }
            array.push(key + "=" + val);
        }
    }

    return array.toString();
}

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });

    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += " )";
        queryString += "VALUES (";
        queryString += questionMark(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, res) {
            if (err) {
                throw err;
            }

            cb(res);
        });
    },

    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objSQL(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log("queryString", queryString);

        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }

            cb(res);
        });
    }

}

// Export

module.exports = orm;