var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    commandeData = require('./../models/db')

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
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

        var dateList = [];
        for (var i = 0; i < jsonObj.quantity; i++) {
            var insert = [];
            insert.push(randomDate(new Date(jsonObj.dateMin), new Date(jsonObj.dateMax)));
            dateList.push(insert);
        }

        commandeData.addCommande(dateList, function(err) {
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
router.get('/truncate', truncateTable);


// export router
module.exports = router;