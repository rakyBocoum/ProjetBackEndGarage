module.exports = function(sequelize,Sequelize){
    const User = sequelize.define('users',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNULL: false
        },
        prenom:{
            type:Sequelize.STRING,
            allowNULL: false
        },
        nom:{
            type:Sequelize.STRING,
            allowNULL: false
        },
        telephone:{
            type:Sequelize.INTEGER,
            allowNULL: false
        },
        adresse:{
            type:Sequelize.STRING,
            allowNULL: false
        },
        email:{
            type:Sequelize.STRING,
            allowNULL: false
        },
        password:{
            type:Sequelize.STRING,
            allowNULL: false
        },
        role:{
            type:Sequelize.STRING,
            defaultValue: 'passager',
            allowNULL: false
        },
       
    },{timestamp:true});
    return User;
    }
    