var mysql      = require('mysql');

// define the connection
var connection = mysql.createConnection({
  host     : '192.168.10.165',
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

// select all in table produit
exports.getAllProduit = function getAllProduit(callback) {
  request = "SELECT * FROM produit;"

  connection.query(request, function(err, rows, fields) {
    callback(err, rows);
  });
};

// select all in table produit
exports.getAllCommandeProduit = function getAllProduitCommande(callback) {
  request = "SELECT * FROM produit;"

  connection.query(request, function(err, rows, fields) {
    callback(err, rows);
  });
};

// insert table commande
exports.addCommande = function addCommande(insert, callback) {
	request = "INSERT INTO commande (id, date_enregistrement) VALUES ?";

	connection.query(request, [insert], function(err, rows, fields) {
  	callback(err, rows);
  });
};

// insert table commande_produit
exports.addCommandeProduit = function addCommande(insert, callback) {
  request = "INSERT INTO commande_produit (id_commande, quantite, id_produit) VALUES ?";

  connection.query(request, [insert], function(err, rows, fields) {
    callback(err, rows);
  });
};