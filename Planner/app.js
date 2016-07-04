var express = require('express'),
  app = express(),
  fabricationData = require('./models/fabrication'),
  administrationData = require('./models/administration');

setTimeout(planner, 5000);

function planner() {
	fabricationData.getAllfabrication(function(err, fabricationList) {
		if (err) {
			console.log(err);
		} else {
			var listIdCommand = [];
			var fabricationLength = fabricationList.length;

			for (var id in fabricationList) {
				listIdCommand[fabricationList[id].id_commande] = fabricationList[id].id;
			}

			administrationData.getAllCommande(function(err, commandeList) {
				if (err) {
					console.log(err);
				} else {
					var insert = [];
					var idCommande = [];
					var idCommandeList = [];

					// get all commande to insert in fabrication
					for (var i = 0; i < commandeList.length; i++) {
						idCommande = [];
						if (listIdCommand[commandeList[i].id] == undefined) {
							fabricationLength++;
							idCommandeList.push(commandeList[i].id);
							idCommande.push(fabricationLength, commandeList[i].id);
							insert.push(idCommande);
						}
					}
					
					//insert commande in fabrication
					console.log(insert);
					fabricationData.addFabrication(insert, function(err, rows) {
						if (err) {
							console.log(err);
						} else {
							administrationData.getCommandProduitByCommandId(idCommandeList, function(err, commandProduitList) {
								if (err) {
									console.log(err);
								} else {
									var insert = [];
									var ids = [];

									for (var idRows in rows) {
										for (var id in commandProduitList) {
											ids = [];
											if (commandProduitList[id].id_commande == rows[idRows][1]) {
												ids.push(rows[idRows][0], commandProduitList[id].id);
												insert.push(ids);										
											}
										}
									}

									console.log(insert);
									// insert in table fabrication_produit
									fabricationData.addFabricationProduit(insert, function(err, rows) {
										if (err) {
											console.log(err);
										} else {
											console.log("insert");
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
	setTimeout(planner, 5000);
}