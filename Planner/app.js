var express = require('express'),
  app = express(),
  fabricationData = require('./models/fabrication'),
  conditionnementData = require('./models/conditionnement'),
  administrationData = require('./models/administration');

setTimeout(transfer, 5000);

function randomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function planner(firstDate, dateA, dateB, dateC) {
	debutDateA = firstDate;

	// add hours to change produit
	if (dateA != '') {
		for (var z in dateA) {
			var timeDiff = Math.abs(dateA[z].getTime() - debutDateA.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600)); 
			if (diffDays <= 2 && diffDays >= -2) {
				debutDateA = new Date(debutDateA.getTime() + (2*60*60*1000))
				break;
			}
		}
	}

	finDateA = new Date(debutDateA.getTime() + (1*60*60*1000));
	dateA.push(debutDateA);
	debutDateB = new Date(finDateA.getTime() + (1*60*60*1000));

	// add hours to change produit
	if (dateB != '') {
		for (var z in dateB) {
			var timeDiff = Math.abs(dateB[z].getTime() - debutDateB.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600)); 
			if (diffDays <= 4 && diffDays >= -4) {
				debutDateB = new Date(debutDateB.getTime() + (4*60*60*1000))
				break;
			}
		}
	}

	finDateB = new Date(debutDateB.getTime() + (3*60*60*1000));
	dateB.push(debutDateB);
	debutDateC = new Date(finDateB.getTime() + (1*60*60*1000));

	// add hours to change produit
	if (dateC != '') {
		for (var z in dateC) {
			var timeDiff = Math.abs(dateC[z].getTime() - debutDateC.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600)); 
			if (diffDays <= 3 && diffDays >= -3) {
				debutDateC = new Date(debutDateC.getTime() + (3*60*60*1000))
				break;
			}
		}
	}

	finDateC = new Date(debutDateC.getTime() + (2*60*60*1000));
	dateC.push(debutDateC);

	var obj = {'debut_machine_A' : debutDateA,
							'fin_machine_A' : finDateA,
							'debut_machine_B' : debutDateB,
							'fin_machine_B' : finDateB,
							'debut_machine_C' : debutDateC,
							'fin_machine_C' : finDateC};

	return obj;
}

function plannerCond(firstDate, dateA, dateB, dateC, machine) {
	debutDate = firstDate;
	debutDateA = null;
	finDateA = null;
	debutDateB = null;
	finDateB = null;
	debutDateC = null;
	finDateC = null;

	if (machine == 1) {
		if (dateA == '') {
			debutDateA = debutDate;
			finDateA = new Date(debutDate.getTime() + (1*60*60*1000));
		} else {
			for (var z in dateA) {
				var timeDiff = Math.abs(dateA[z].getTime() - debutDate.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600)); 
				if (diffDays <= 2 && diffDays >= -2) {
					debutDateA = new Date(debutDate.getTime() + (2*60*60*1000));
					finDateA = new Date(debutDate.getTime() + (1*60*60*1000));
					dateA.push(debutDateA);
					break;
				}
			}
		}
	} else if (machine == 2) {
		if (dateB == '') {
			debutDateB = debutDate;
			finDateB = new Date(debutDate.getTime() + (1*60*60*1000));
		} else {
			for (var z in dateB) {
				var timeDiff = Math.abs(dateB[z].getTime() - debutDate.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600)); 
				if (diffDays <= 2 && diffDays >= -2) {
					debutDateB = new Date(debutDate.getTime() + (2*60*60*1000));
					finDateB = new Date(debutDate.getTime() + (1*60*60*1000));
					dateB.push(debutDateB);
					break;
				}
			}
		} 
	} else {
		if (dateC == '') {
			debutDateC = debutDate;
			finDateC = new Date(debutDate.getTime() + (1*60*60*1000));
			cond = true;
		} else {
			for (var z in dateC) {
				var timeDiff = Math.abs(dateC[z].getTime() - debutDate.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600)); 
				if (diffDays <= 2 && diffDays >= -2) {
					debutDateC = new Date(debutDate.getTime() + (2*60*60*1000));
					finDateC = new Date(debutDate.getTime() + (1*60*60*1000));
					dateC.push(debutDateC);
					break;
				}
			}
		}
	}

	var obj = {'debut_machine_A' : debutDateA,
							'fin_machine_A' : finDateA,
							'debut_machine_B' : debutDateB,
							'fin_machine_B' : finDateB,
							'debut_machine_C' : debutDateC,
							'fin_machine_C' : finDateC};

	return obj;
}

// this function all
function transfer() {
	// count ordonnancement
	fabricationData.countOrdonnancement(function(err, countOrdonnancement) {
		if (err) {
			console.log(err);
		} else {
			countOrdonnancement = countOrdonnancement[0].count;
			console.log('Count fabrication : ' + countOrdonnancement);

			// get all null commandes
			administrationData.getNullCommande(function(err, commandeList) {
				if (err) {
					console.log(err);
				} else {
					var query = [];

					for (var id in commandeList) {
						query.push(commandeList[id].id);
					}

					if (query == '') {
						plannerConditionnement();
					}

					// get all matching command_produit
					administrationData.getCommandProduitByCommandId(query, function(err, commandProduitList) {
						if (err) {
							console.log(err);
						} else {
							var queryOrdonnancement = [];
							var queryFabrication = [];
							var queryCommande = [];
							var commande = [];
							var produit = [];
							var date = [];
							var dateA = [];
							var dateB = [];
							var dateC = [];
 			
							// create the query to insert
							for (var id in commandProduitList) {
								// define date debut machine A
								if (produit[commandProduitList[id].id_produit] != undefined) {
									for (var i in commandeList) {

										// if produit exist and date possible
										for (var y in produit[commandProduitList[id].id_produit]) {
											if (commandeList[i].id == commandProduitList[id].id_commande) {
												// if can be added
												if (produit[commandProduitList[id].id_produit][y] > commandeList[i].date_enregistrement) {
													queryOrdonnancement[queryOrdonnancement.length-1].quantite += commandProduitList[id].quantite;

													queryFabrication.push({'id_produit_commande' : commandProduitList[id].id,
																							'id_ordonnancement': countOrdonnancement});

														commande.push({'id' : commandeList[i].id, 
																					'date_fin_fabrication' : queryOrdonnancement[queryOrdonnancement.length-1].fin_machine_C});
													break;
												}	else {
													// else create new
													var obj = planner(commandeList[i].date_enregistrement, dateA, dateB, dateC);
													countOrdonnancement++;
													produit[commandProduitList[id].id_produit].push(commandeList[i].date_enregistrement);
													//console.log(produit[commandProduitList[id].id_produit]);
													queryOrdonnancement.push({'id' : countOrdonnancement,
																										'debut_machine_A' : obj.debut_machine_A,
																										'fin_machine_A' : obj.fin_machine_A,
																										'debut_machine_B' : obj.debut_machine_B,
																										'fin_machine_B' : obj.fin_machine_B,
																										'debut_machine_C' : obj.debut_machine_C,
																										'fin_machine_C' : obj.fin_machine_C,
																										'id_produit' : commandProduitList[id].id_produit,
																										'quantite' : commandProduitList[id].quantite
																									});
													queryFabrication.push({'id_produit_commande' : commandProduitList[id].id,
																									'id_ordonnancement': countOrdonnancement});

													commande.push({'id' : commandeList[i].id, 
																					'date_fin_fabrication' : obj.fin_machine_C});
													break;
												}
											}
										}	
									}
								} else {
									// if produit don't exist
									for (var i in commandeList) {
										if (commandeList[i].id == commandProduitList[id].id_commande) {
											var obj = planner(commandeList[i].date_enregistrement, dateA, dateB, dateC);
											countOrdonnancement++;

											produit[commandProduitList[id].id_produit] = [commandeList[i].date_enregistrement];

											queryOrdonnancement.push({'id' : countOrdonnancement,
																								'debut_machine_A' : obj.debut_machine_A,
																								'fin_machine_A' : obj.fin_machine_A,
																								'debut_machine_B' : obj.debut_machine_B,
																								'fin_machine_B' : obj.fin_machine_B,
																								'debut_machine_C' : obj.debut_machine_C,
																								'fin_machine_C' : obj.fin_machine_C,
																								'id_produit' : commandProduitList[id].id_produit,
																								'quantite' : commandProduitList[id].quantite
																							});

											queryFabrication.push({'id_produit_commande' : commandProduitList[id].id,
																							'id_ordonnancement': countOrdonnancement});

											commande.push({'id' : commandeList[i].id, 
																			'date_fin_fabrication' : obj.fin_machine_C});
										}
									}
								}
							}

							var	id_com = null; 
							var last_date = null;
							for (var i in commande) {
								if (commande[i].id != id_com) {
									queryCommande.push({'id' : id_com, 
																			'date_fin_fabrication' : last_date});
									id_com = commande[i].id;
								}

								if (commande[i].date_fin_fabrication > last_date || last_date == null) {
									last_date = commande[i].date_fin_fabrication
									id_com = commande[i].id;
								}

								if (i == commande.length-1) {
									queryCommande.push({'id' : id_com, 
																			'date_fin_fabrication' : last_date});
								}
							}

							administrationData.updateCommande(queryCommande, function(err) {
								if (err) {
									console.log(err);
								}
							});

							fabricationData.addOrdonnancement(queryOrdonnancement, function(err) {
								if (err) {
									console.log(err);
								} else {
									fabricationData.addFabrication(queryFabrication, function(err) {
										if (err) {
											console.log(err);
										}
										plannerConditionnement();
									});
								}
							});
						}
					});
				}
			});
		}
	});	
	setTimeout(transfer, 5000);
}

function plannerConditionnement() {
	// count ordonnancement
	conditionnementData.countOrdonnancement(function(err, countOrdonnancement) {
		if (err) {
			console.log(err);
		} else {
			countOrdonnancement = countOrdonnancement[0].count;
			console.log('Count conditonnement : ' + countOrdonnancement)

			// get all null commandes
			administrationData.getNullConditonnementCommande(function(err, commandeList) {
				if (err) {
					console.log(err);
				} else {
					var query = [];

					for (var id in commandeList) {
						query.push(commandeList[id].id);
					}

					// get all matching command_produit
					administrationData.getCommandProduitByCommandId(query, function(err, commandProduitList) {
						if (err) {
							console.log(err);
						} else {
							var queryOrdonnancement = [];
							var queryConditionnement = [];
							var queryCommande = [];
							var commande = [];
							var produit = [];
							var date = [];
							var conditonnementDateA = [];
							var conditonnementDateB = [];
							var conditonnementDateC = [];
 			
							// for each commande_produit
							for (var id in commandProduitList) {
								// define date debut machine A
								if (produit[commandProduitList[id].id_produit] != undefined) {
									for (var i in commandeList) {
										// if produit exist and date possible
										for (var y in produit[commandProduitList[id].id_produit]) {
											if (commandeList[i].id == commandProduitList[id].id_commande) {
												// if can be added
												if (produit[commandProduitList[id].id_produit][y] > commandeList[i].date_fin_fabrication) {
													queryOrdonnancement[queryOrdonnancement.length-1].quantite += commandProduitList[id].quantite;

													queryConditionnement.push({'id_produit_commande' : commandProduitList[id].id,
																							'id_ordonnancement': countOrdonnancement});

													var date_fin_preparation = null;
													if (queryOrdonnancement[queryOrdonnancement.length-1].fin_machine_A != null) {
														date_fin_preparation = queryOrdonnancement[queryOrdonnancement.length-1].fin_machine_A;
													} else if (queryOrdonnancement[queryOrdonnancement.length-1].fin_machine_B != null) {
														date_fin_preparation = queryOrdonnancement[queryOrdonnancement.length-1].fin_machine_B;
													} else {
														date_fin_preparation = queryOrdonnancement[queryOrdonnancement.length-1].fin_machine_C;
													}
													commande.push({'id' : commandeList[i].id, 
																					'date_fin_preparation' : date_fin_preparation});
													break;
												}	else {
													// else create new
													var obj = plannerCond(commandeList[i].date_fin_fabrication, conditonnementDateA, conditonnementDateB, conditonnementDateC, randomNumber(1,3));
													countOrdonnancement++;
													produit[commandProduitList[id].id_produit].push(commandeList[i].date_fin_fabrication);
													//console.log(produit[commandProduitList[id].id_produit]);
													queryOrdonnancement.push({'id' : countOrdonnancement,
																										'debut_machine_A' : obj.debut_machine_A,
																										'fin_machine_A' : obj.fin_machine_A,
																										'debut_machine_B' : obj.debut_machine_B,
																										'fin_machine_B' : obj.fin_machine_B,
																										'debut_machine_C' : obj.debut_machine_C,
																										'fin_machine_C' : obj.fin_machine_C,
																										'id_produit' : commandProduitList[id].id_produit,
																										'quantite' : commandProduitList[id].quantite
																									});
													queryConditionnement.push({'id_produit_commande' : commandProduitList[id].id,
																									'id_ordonnancement': countOrdonnancement});

													var date_fin_preparation = null;
													if (obj.fin_machine_A != null) {
														date_fin_preparation = obj.fin_machine_A;
													} else if (obj.fin_machine_B != null) {
														date_fin_preparation = obj.fin_machine_B;
													} else {
														date_fin_preparation = obj.fin_machine_C;
													}
													commande.push({'id' : commandeList[i].id, 
																					'date_fin_preparation' : date_fin_preparation});
													break;
												}
											}
										}	
									}
								} else {
									// if produit don't exist
									for (var i in commandeList) {
										if (commandeList[i].id == commandProduitList[id].id_commande) {
											var obj = plannerCond(commandeList[i].date_fin_fabrication, conditonnementDateA, conditonnementDateB, conditonnementDateC, randomNumber(1,3));
											countOrdonnancement++;

											produit[commandProduitList[id].id_produit] = [commandeList[i].date_fin_fabrication];

											queryOrdonnancement.push({'id' : countOrdonnancement,
																								'debut_machine_A' : obj.debut_machine_A,
																								'fin_machine_A' : obj.fin_machine_A,
																								'debut_machine_B' : obj.debut_machine_B,
																								'fin_machine_B' : obj.fin_machine_B,
																								'debut_machine_C' : obj.debut_machine_C,
																								'fin_machine_C' : obj.fin_machine_C,
																								'id_produit' : commandProduitList[id].id_produit,
																								'quantite' : commandProduitList[id].quantite
																							});

											queryConditionnement.push({'id_produit_commande' : commandProduitList[id].id,
																							'id_ordonnancement': countOrdonnancement});
											var date_fin_preparation = null;
											if (obj.fin_machine_A != null) {
												date_fin_preparation = obj.fin_machine_A;
											} else if (obj.fin_machine_B != null) {
												date_fin_preparation = obj.fin_machine_B;
											} else {
												date_fin_preparation = obj.fin_machine_C;
											}

											commande.push({'id' : commandeList[i].id, 
																			'date_fin_preparation' : date_fin_preparation});
										}
									}
								}
							}

							var	id_com = 1 
							var last_date = null;
							for (var i in commande) {
								if (commande[i].id != id_com) {
									queryCommande.push({'id' : id_com, 
																			'date_fin_preparation' : last_date});
									id_com = commande[i].id;
									last_date = null;	
								}

								if (commande[i].date_fin_preparation > last_date || last_date == null) {
									last_date = commande[i].date_fin_preparation
								}

								if (i == commande.length-1) {
									queryCommande.push({'id' : id_com, 
																			'date_fin_preparation' : last_date});
								}
							}

							administrationData.updateCommandeCond(queryCommande, function(err) {
								if (err) {
									console.log(err);
								}
							});

							conditionnementData.addOrdonnancement(queryOrdonnancement, function(err) {
								if (err) {
									console.log(err);
								} else {
									conditionnementData.addConditionnement(queryConditionnement, function(err) {
										if (err) {
											console.log(err);
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
}