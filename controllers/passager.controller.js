

const express = require('express');
const { addBagage, deletePassager,getBagPassager, updateBagage, deleteBagage, getAllPassager,getPassagerByID,PassagerID,PassagerIdByDepart,addPerte } = require("../services/passager.service");


const routes = express.Router();




routes.get('/all', getAllPassager);
routes.get('/passagerBagage/:id',getBagPassager);
routes.post('/createBagage/:id/:dateHeure',addBagage);
routes.get('/:id',getPassagerByID);
routes.put('/update/:id',updateBagage);
routes.delete('/delete/:id',deleteBagage);
routes.delete('/deletePassager/:id',deletePassager);
//routes.get('/departs/:destination',savePassagerInCar);
routes.get('/idPassager/:id',PassagerID)
routes.get('/idPassagerDepart/:id',PassagerIdByDepart);

routes.put('/addperte/:id',addPerte)




module.exports = routes;