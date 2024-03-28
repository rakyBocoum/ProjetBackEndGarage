module.exports = function(sequelize,Sequelize){
    const Voiture = sequelize.define('voitures',{

        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNULL: false
        },
        type:{
            type:Sequelize.STRING,
            allowNULL: false
        },
        matricule:{
            type:Sequelize.STRING,
            allowNULL: false
        },
       
    },{timestamp:true});
   
    return Voiture;
    }
    