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


// truncate table commande
// exports.truncateCommande = function truncateCommande(callback) {
// 	request1 = "SET FOREIGN_KEY_CHECKS = 0;";
//   request2 = "TRUNCATE TABLE commande_produit, commande;";
//   request3 = "SET FOREIGN_KEY_CHECKS = 1;";
	
// 	connection.query(request1, function(err, rows, fields) {
//   	 connection.query(request2, function(err, rows, fields) {
//       connection.query(request3, function(err, rows, fields) {
//         callback(err, rows);
//       });
//     });
//   });
// };