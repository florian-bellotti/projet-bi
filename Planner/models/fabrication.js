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

// count table ordonnancement
exports.countOrdonnancement = function countOrdonnancement(callback) {
	request = "SELECT count(*) AS count FROM ordonnancement;"

	connection.query(request, function(err, rows, fields) {
  	callback(err, rows);
  });
};

// insert into table fabrication
exports.addFabrication = function addFabrication(insert, callback) {
  request = "INSERT INTO fabrication (id_produit_commande, id_ordonnancement) VALUES ?";
  inserts = [];
  query = [];

  for (var i in insert) {
    query = [];
    query.push(insert[i].id_produit_commande, insert[i].id_ordonnancement);
    inserts.push(query);
  }

  if (insert !=  '') {
    connection.query(request, [inserts], function(err, rows, fields) {
      callback(err);
    });
  } else {
    callback('');
  }
};

// insert into table ordonnancement
exports.addOrdonnancement = function addOrdonnancement(insert, callback) {
  request = "INSERT INTO ordonnancement (id, debut_machine_A, fin_machine_A, debut_machine_B, fin_machine_B, debut_machine_C, fin_machine_C, id_produit, quantite) VALUES ?";
  inserts = [];
  query = [];

  for (var i in insert) {
    query = [];
    query.push(insert[i].id, insert[i].debut_machine_A, insert[i].fin_machine_A, insert[i].debut_machine_B, insert[i].fin_machine_B, insert[i].debut_machine_C, insert[i].fin_machine_C, insert[i].id_produit, insert[i].quantite);
    inserts.push(query);
  }

  if (insert !=  '') {
    connection.query(request, [inserts], function(err, rows, fields) {
      callback(err);
    });
  } else {
    callback('');
  }
};