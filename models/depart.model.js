module.exports = function(sequelize,Sequelize){
    const Depart = sequelize.define('departs',{

        
        dateHeure:{
            type:Sequelize.STRING,
            allowNULL: false,
            primaryKey:true
        },
        destination:{
            type:Sequelize.STRING,
            allowNULL: false,
            primaryKey:true,
        },
       
    },{timestamp:true});
    return Depart;
    }
    