const { addDepart, getAllDepart,  updateDepart, deleteDepart,AddPassagerInDepart,getPassager,deletePassagerDepart,getDepartById } = require("../services/depart.service");



const express = require('express');

const routes = express.Router();



routes.get('/all',getAllDepart);
//routes.get('/getOne/:id',getDepartById);
routes.post('/create/:id',addDepart);
routes.put('/update/:id',updateDepart);
routes.delete('/delete/:id',deleteDepart);
routes.put('/addPassager/:id/:dateHeure/:destination',AddPassagerInDepart);
routes.get('/allPassager/:id/:dateHeure/:destination',getPassager);
routes.delete('/deletePassager/:id/:dateHeure/:destination/:passager_id',deletePassagerDepart)
routes.get('/departById/:id/:dateHeure',getDepartById)




module.exports = routes;