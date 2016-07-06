var mysql      = require('mysql');

// define the connection
var connection = mysql.createConnection({
  host     : '192.168.10.100',
  user     : 'root',
  password : 'root',
  database : 'administration'
});

// select in table commande
exports.getNullCommande = function getNullCommande(callback) {
	request = "SELECT * FROM commande WHERE date_fin_fabrication is NULL ORDER BY date_enregistrement ;"

	connection.query(request, function(err, rows, fields) {
  		callback(err, rows);
  	});
};
// select in table commande
exports.getNullConditonnementCommande = function getNullConditonnementCommande(callback) {
	request = "SELECT * FROM commande WHERE date_fin_preparation is NULL ORDER BY date_enregistrement ;"

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

// update table commande
exports.updateCommande = function updateCommande(query, callback) {
	request = "UPDATE commande SET date_fin_fabrication = ? WHERE id = ?";

	for (var i in query) {
		connection.query(request, [[query[i].date_fin_fabrication], [query[i].id]], function(err, rows, fields) {
	  		callback(err);
	  	});
	}
};

// update table commande with conditionnement
exports.updateCommandeCond = function updateCommandeCond(query, callback) {
	request = "UPDATE commande SET date_fin_preparation = ? WHERE id = ?";
	
	for (var i in query) {
		connection.query(request, [[query[i].date_fin_preparation], [query[i].id]], function(err, rows, fields) {
	  		callback(err);
	  	});
	}
};

