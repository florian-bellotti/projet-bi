var mysql      = require('mysql');

// define the connection
var connection = mysql.createConnection({
  host     : '192.168.10.100',
  user     : 'root',
  password : 'root',
  database : 'administration'
});

// select all in table commande
exports.getAllCommande = function getAllCommande(callback) {
	request = "SELECT * FROM commande ORDER BY date_enregistrement;"

	connection.query(request, function(err, rows, fields) {
  	callback(err, rows);
  });
};

// select all in table commande
exports.getCommandProduitByCommandId = function getCommandProduitByCommandId(id, callback) {
	request = "SELECT * FROM commande_produit where id_commande in ?";
	
	if (id !=  '') {
		connection.query(request, [[id]], function(err, rows, fields) {
	  	callback(err, rows);
	  });
	}	
};