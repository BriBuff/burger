// mySQL Connection

var mySQL = require("mySQL");

var connection;

if(process.env.JAWSDB_URL) {
    connection = mySQL.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burgers_db"
    });
};

// Connection

connection.connect(function(err){
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);

});

// Export for ORM

module.exports = connection;