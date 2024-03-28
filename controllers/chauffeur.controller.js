const { getAllChauffeur, deleteChauffeur, updateChauffeur, getVoitures,getChauffeurByID } = require("../services/chauffeur.service");
//const { registerUserChauffeur }= require("../services/user.service")



const express = require('express');

const routes = express.Router();



routes.get('/all',getAllChauffeur);

routes.get('/voiture/:id',getVoitures);
routes.put('/update/:id',updateChauffeur);
routes.get('/search/:id',getChauffeurByID)
routes.delete('/delete/:id',deleteChauffeur);




module.exports = routes;