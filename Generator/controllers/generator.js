var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    commandeData = require('./../models/db')

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

// add commande
function addCommande(req, res){
    var body = "";

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        console.log('body: ' + body);
        var jsonObj = JSON.parse(body);

        commandeData.addCommande(jsonObj.date_fin_fabrication, jsonObj.date_fin_preparation, jsonObj.date_fin_expedition, jsonObj.date_enregistrement, function(err) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send();
            }
        });
    })
}

// define all routes
router.get('/', getCommandeView);
router.get('/list', getAllCommande);
router.post('/add', addCommande);

// export router
module.exports = router;