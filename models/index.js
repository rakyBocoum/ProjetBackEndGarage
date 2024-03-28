//Importation de la classe sequelize
const {Sequelize} = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.PASSWORD,
    {
     host: process.env.HOST,
     port: process.env.PORT,
     dialect:'mysql',
    }
);

const db = {};

db.sequelize=sequelize;
db.Sequelize=Sequelize;

//déclarationa de la variable de type user
db.User = require('./user.model')(sequelize,Sequelize);

//déclarationa de la variable de type chauffeur
db.Chauffeur = require('./chauffeur.model')(sequelize,Sequelize);

//déclarationa de la variable de type passager
db.Passager = require('./passager.model')(sequelize,Sequelize);

//déclarationa de la variable de type voiture
db.Voiture = require('./voiture.model')(sequelize,Sequelize);

//déclarationa de la variable de type bagage
db.Bagage = require('./bagage.model')(sequelize,Sequelize);

//déclarationa de la variable de type depart
db.Depart = require('./depart.model')(sequelize,Sequelize);

//Relation d'héritage user et passager et chauffeur
db.User.hasOne(db.Passager);
db.User.hasOne(db.Chauffeur);

//Relation OnToMany chauffeur et voiture
db.Chauffeur.hasMany(db.Voiture,{as:'voitures',onDelete:'cascade'});
db.Voiture.belongsTo(db.Chauffeur);

//ManytoMany Passager et voiture
db.Passager.belongsToMany(db.Voiture, { through: 'departs',as: 'voitures',foreignKey:'passager_id'});
db.Voiture.belongsToMany(db.Passager, { through: 'departs',as: 'passagers',foreignKey:'voiture_id'});

//Relation OnToMany passager et bagage
db.Passager.hasMany(db.Bagage,{as:'bagages',onDelete:'cascade'});
db.Bagage.belongsTo(db.Passager);



module.exports = db;