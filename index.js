//Importation du module express
const express = require('express');
const { Op } = require('sequelize');
const db = require('./models');

const User = db.User;
const bcrypt = require('bcryptjs');

//Importation  du body-parser
const bodyParser = require('body-parser');
const cors = require('cors');


//Définir le port
const port=3000;



//Déclaration de l'application
const app= express();

//permet de lire les données des requêtes au format json
app.use(bodyParser.json());
//app.use(cors());
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));

//permet de lire les paramètres dans les requêtes
//app.use(bodyParser.urlencoded({extended : true}));// app.use(express.urlencoded({extended:true}));

//const { verifyToken } = require('./middlewares/JwtAuth')

//Importation des routes du User controller
const UserRoutes = require('./controllers/user.controller');
app.use('/api/user',UserRoutes);

const BagageRoutes = require('./controllers/bagages.controller')
app.use('/api/bagages', BagageRoutes);

//Importation des routes du Voiture controller
const VoitureRoutes = require('./controllers/voiture.controller');
app.use('/api/voiture',VoitureRoutes);
const DepartRoutes= require('./controllers/depart.controller');
app.use('/api/depart',DepartRoutes);

//Importation des routes du Depart controller
//const DepartRoutes = require('./controllers/depart.controller');
//app.use('/api/depart',DepartRoutes);

//Importation des routes du Passager controller
const PassagerRoutes = require('./controllers/passager.controller');
app.use('/api/passager',PassagerRoutes);

//Importation des routes du Chauffeur controller
const ChauffeurRoutes = require('./controllers/chauffeur.controller');
app.use('/api/chauffeur',ChauffeurRoutes);


db.sequelize.sync({alter:true}).then(function(){
    console.log('Tables are created successfully');
}).catch(function(error){
    console.log(error);
    console.log('Error when creating tables ');
});


app.listen(port,function(){
    console.log('App listening on port '+port);
});