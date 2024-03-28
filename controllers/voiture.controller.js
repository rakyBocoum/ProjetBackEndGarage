const { addVoiture, getAllVoiture, getVoitureByID, updateVoiture, deleteVoiture, getPassagers } = require("../services/voiture.service");



const express = require('express');

const routes = express.Router();



routes.get('/all',getAllVoiture);
routes.get('/passagers/:id',getPassagers);
routes.get('/:id',getVoitureByID)
routes.post('/create/:id',addVoiture);
routes.put('/update/:id',updateVoiture);
routes.delete('/delete/:id',deleteVoiture);




module.exports = routes;