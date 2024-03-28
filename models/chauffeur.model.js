module.exports = function(sequelize,Sequelize){
    const Chauffeur = sequelize.define('chauffeurs',{
        numPermis:{
            type:Sequelize.INTEGER,
            allowNULL: false
        },
      
        
    },{timestamp:true});
    return Chauffeur;
    }
    