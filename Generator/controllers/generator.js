var express = require('express'),
    router = express.Router(),
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

// define all routes
router.get('/', getCommandeView);
router.get('/list', getAllCommande);

// export router
module.exports = router;