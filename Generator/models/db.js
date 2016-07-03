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

// insert table commande
exports.addCommande = function addCommande(date_fin_fabrication, date_fin_preparation, date_fin_expedition, date_enregistrement, callback) {
	request = "insert into commande (date_fin_fabrication, date_fin_preparation, date_fin_expedition, date_enregistrement) values (' " + date_fin_fabrication + "', '" + date_fin_preparation + "', '" + date_fin_expedition + "', '" + date_enregistrement + "');"

	connection.query(request, function(err, rows, fields) {
  		callback(err, rows);
  	});
};