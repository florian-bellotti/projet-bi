var mysql      = require('mysql');

// define the connection
var connection = mysql.createConnection({
  host     : '192.168.10.101',
  user     : 'root',
  password : 'root',
  database : 'fabrication'
});

// open the connection
connection.connect();

// select all in table fabrication
exports.getAllfabrication = function getAllfabrication(callback) {
	request = "SELECT * FROM fabrication;"

	connection.query(request, function(err, rows, fields) {
  	callback(err, rows);
  });
};

// insert into table fabrication
exports.addFabrication = function addFabrication(insert, callback) {
  request = "INSERT INTO fabrication (id, id_commande) VALUES ?";

  if (insert !=  '') {
    connection.query(request, [insert], function(err, rows, fields) {
      callback(err, insert);
    });
  } else {
    callback('', '');
  }
};

// insert into table fabrication_produit
exports.addFabricationProduit = function addFabricationProduit(insert, callback) {
  request = "INSERT INTO fabrication_produit (id_fabrication, id_commande_produit) VALUES ?";

  if (insert !=  '') {
    connection.query(request, [insert], function(err, rows, fields) {
      callback(err);
    });
  } else {
    callback('');
  }
};