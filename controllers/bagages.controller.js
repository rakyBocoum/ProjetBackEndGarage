const express = require('express');
const{lesPertes,retrieve,sendEmail} = require("../services/bagages.service")
const routes = express.Router();



routes.get('/perdu',lesPertes);
routes.put('/retrieve/:id',retrieve);
routes.post('/sendmail/:id',sendEmail);


module.exports = routes;