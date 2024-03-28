module.exports = function(sequelize,Sequelize){
    const Passager = sequelize.define('passagers',{
        Cni:{
            type:Sequelize.STRING,
            allowNULL: false
        },
      
        
    },{timestamp:true});
    
    return Passager;
    }
    