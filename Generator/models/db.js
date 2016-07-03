var mysql      = require('mysql');

// define the connection
var connection = mysql.createConnection({
  host     : '192.168.10.161',
  user     : 'root',
  password : 'root',
  database : 'administration'
});

// open the connection
connection.connect();

// select all in table commande
exports.getAllCommande = function getAllCommande(callback) {
	request = "SELECT * FROM commande;"

	connection.query(request, function(err, rows, fields) {
  		callback(err, rows);
  	});
};