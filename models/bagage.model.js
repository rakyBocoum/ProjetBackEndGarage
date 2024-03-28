module.exports = function(sequelize,Sequelize){
    const Bagage = sequelize.define('bagages',{

        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNULL: false
        },
        libelle:{
            type:Sequelize.STRING,
            allowNULL: false
        },
        
        quantite:{
            type:Sequelize.STRING,
            allowNULL: false
        },
        dateEnregistrement:{
            type:Sequelize.STRING,
            allowNULL: false,
        },
        perdu:{
            type: Sequelize.BOOLEAN, 
            defaultValue: false,    
            allowNull: false
        }
      
        
    },{timestamp:true});
    return Bagage;
    }
    