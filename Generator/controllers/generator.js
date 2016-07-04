var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    commandeData = require('./../models/db')

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
}

// return the commande view  
function getCommandeView(req, res){
    res.status(200).render('commande', {commandes : []});
}

// return all commandes 
function getAllCommande(req, res){
    commandeData.getAllCommande(function(err, commandeList) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({commandes : commandeList});
        }
    });
}

// truncate table commande
function truncateTable(req, res){
    commandeData.truncateCommande(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send();
        }
    });
}

// add commande
function addCommande(req, res){
    var body = "";

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        var jsonObj = JSON.parse(body);
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
                    var quantity = 0;
                    var id = 0;
                    var numberDifferentProducts = 0;

                    // generate all commande
                    for (var i = 0; i < jsonObj.quantity; i++) {
                        // generate commande
                        commandeLength += 1;
                        dateInsert = [];
                        dateInsert.push(commandeLength, randomDate(new Date(jsonObj.dateMin), new Date(jsonObj.dateMax)));
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
                    console.log(dateList);
                    commandeData.addCommande(dateList, function(err) {
                        if (err) {
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
        });
    })
}

// define all routes
router.get('/', getCommandeView);
router.get('/list', getAllCommande);
router.post('/add', addCommande);
//router.get('/truncate', truncateTable);


// export router
module.exports = router;