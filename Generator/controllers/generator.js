var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    commandeData = require('./../models/db'),
    fs = require('fs');

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function getNames(callback){
    fs.readFile('models/names.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      callback(data); 
    }); 
}

function getFistNames(callback){
    fs.readFile('models/first-names.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      callback(data); 
    }); 
}

// return the commande view  
function getCommandeView(req, res){
    console.log(new Date() + " - Get Commande View");
    res.status(200).render('commande', {commandes : []});
}

// return all commandes 
function getAllCommande(req, res){
    console.log(new Date() + " - Get all Commande");
    commandeData.getAllCommande(function(err, commandeList) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({commandes : commandeList});
        }
    });
}

// add commande
function addCommande(req, res){
    console.log(new Date() + " - Add Commande");
    var body = "";

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        var jsonObj = JSON.parse(body);
        getNames(function(names){
            names = JSON.parse(names);
            getFistNames(function(firstNames){
                firstNames = JSON.parse(firstNames);
                commandeData.getClient(function(errClient, clients) {
                    if (errClient) {
                        console.log(errClient);
                    } else {
                        commandeData.getAllCommande(function(err, commandeList) {
                            commandeLength = commandeList.length;

                            commandeData.getAllProduit(function(err, produitList) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    var dateList = [];
                                    var dateInsert = [];
                                    var commandeProduits = [];
                                    var commandeProduitInsert = [];
                                    var idClient = 0;
                                    var clientList = [];
                                    var client = [];
                                    var quantity = 0;
                                    var id = 0;
                                    var numberDifferentProducts = 0;
                                    var newClient = 0;
                                    var clientLength = clients.length;

                                    // generate all commande
                                    for (var i = 0; i < jsonObj.quantity; i++) {
                                        client = [];
                                        newClient = randomNumber(1,10);

                                        // generate client
                                        if (newClient < 3 || clientLength < 20) {
                                            // create user
                                            clientLength += 1;
                                            idClient = clientLength;
                                            randomName = names[randomNumber(1,names.length-1)];
                                            randomFirstName = firstNames[randomNumber(1,firstNames.length-1)];
                                            randomAge = randomNumber(15, 70);
                                            randomSexe = parseInt(Math.random() * 2) ?  true : false;
                                            client.push(idClient, randomName, randomFirstName, randomSexe, randomAge);
                                            clientList.push(client);
                                        } else {
                                            // random user
                                            idClient = randomNumber(1, clientLength);
                                        }

                                        // generate commande
                                        commandeLength += 1;
                                        dateInsert = [];
                                        dateInsert.push(commandeLength, idClient, randomDate(new Date(jsonObj.dateMin), new Date(jsonObj.dateMax)));
                                        dateList.push(dateInsert);

                                        // generate products
                                        numberDifferentProducts = randomNumber(1,4);
                                        for (var y = 0; y < numberDifferentProducts; y++) {
                                            commandeProduitInsert = [];
                                            quantity = randomNumber(1,15);
                                            id = randomNumber(1,produitList.length-1);
                                            commandeProduitInsert.push(commandeLength, quantity, produitList[id].id);
                                            commandeProduits.push(commandeProduitInsert);
                                        }
                                    }

                                    // insert in db
                                    commandeData.addClient(clientList, function(err) {
                                        if (err) {
                                                console.log(err);
                                            } else {
                                            commandeData.addCommande(dateList, function(err) {
                                                if (err) {
                                                    console.log("e");
                                                    console.log(err);
                                                } else {
                                                    commandeData.addCommandeProduit(commandeProduits, function(err) {
                                                        if (err) {
                                                            console.log(err);
                                                        } else {
                                                            res.status(200).send();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    }
                });  
            });
        });
    })
}

// define all routes
router.get('/', getCommandeView);
router.get('/list', getAllCommande);
router.post('/add', addCommande);

// export router
module.exports = router;