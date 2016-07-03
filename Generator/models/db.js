var mysql      = require('mysql');

// define the connection
var connection = mysql.createConnection({
  host     : '192.168.10.164',
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

// insert table commande
exports.addCommande = function addCommande(dateList, callback) {
	request = "INSERT INTO commande (date_enregistrement) VALUES ?";

	connection.query(request, [dateList], function(err, rows, fields) {
  		callback(err, rows);
  	});
};

// truncate table commande
exports.truncateCommande = function truncateCommande(callback) {
	request = "TRUNCATE TABLE commande;";
	
	connection.query(request, function(err, rows, fields) {
  		callback(err, rows);
  	});
};