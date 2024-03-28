const db = require('../models');

const User = db.User;
const Chauffeur = db.Chauffeur;
const Passager = db.Passager;
const Depart = db.Depart;
const Voiture = db.Voiture;
const sequelize = db.sequelize
const{Op} =require('sequelize');
const Bcrypt = require('bcryptjs');


async function addVoiture(req,res){
    let message = ""
    const c = await Chauffeur.findByPk(req.params.id);
    
    if (c !=null) {
     const voiture= await Voiture.create({ 
        type:req.body.type,
        matricule:req.body.matricule,
        chauffeurId:req.body.id
     });
        
    // const voitures = await getAllVoiture(req,res);
    message = "successfully";
    res.status(200).send({"message":message, "voiture":voiture});
     return voiture;
      
    }
    else{
       // let error = "Chauffeur does not exist";
        //return error;
        res.json("chauffeur does not exist");
    }

}

const getAllVoiture =async (req,res)=>{
    let message ="";
    try{

        
     const  voitureData = await sequelize.query(
        'SELECT DISTINCT v.id , v.type, v.matricule ,u.prenom,u.nom,u.telephone ' +
        'FROM voitures AS v , chauffeurs AS c , users AS u ' +
        'WHERE v.chauffeurId = c.id AND c.userId = u.id',
        
        {
            type: sequelize.QueryTypes.SELECT,
        }
    );
    message = "successfully";
   
    res.status(200).send({"message":message,"voitureData":voitureData});
    //return voitureData;
    }catch(error){
        message = "Error ";
        //res.json(error);
        res.status(500).send({"message":message});
        return message;
    }
}
// const getAllVoiture =async (req,res)=>{
//     let message = ""
//     try{
//         let tab =[];
//         let voitures =[];
//         const voiture = await Voiture.findAll();
//         console.log(voiture);
//         res.json(voiture);
//         voiture.forEach(elem => tab.push(
//             {
//                 type : elem.type,
//                 matricule : elem.matricule,
//             }
           
//         ));
//         voitures = Array.from(tab);
//         message="successfully";
//         res.status(200).send({"message":message, "voitures":voitures});
//         return voitures;

//     }
//     catch(error){
//         error = "Error of retrieving voiture";
//         return error;
//     }
// }



async function updateVoiture(req,res){
   
    try{
         const voiture= await Voiture.findByPk(req.params.id);
         if(voiture != null){       
         voiture.update({ 
            type : req.body.type,
            matricule : req.body.matricule,
            chauffeurId : req.body.chauffeurId,
            });
        const voitures = await getAllVoiture(req,res);
        return voitures;
          }
    }
    catch(error){
        error = "Error when updating";
     return error;
 
    }
 }

  const getPassagers = async (req, res)=>{
    try{
        var tab1 =[];
        var tab2 =[];
        var tab3 =[];
        var tab4 =[];

        const pas = Voiture.findByPk(req.params.id);
       if( pas != null){
        const vId = req.params.id;
        const vp= await Depart.findAll({where: {voitureId:req.params.id}});
     // console.log(ps);
        vp.forEach(elem => tab1.push(
            {
                id:elem.passagerId
            }
        ));
        tab2 = Array.from(tab1);
       console.log(tab2);
       var ps=[];
       for(var i=0; i<tab2.length; i++){
       ps[i] = await Passager.findAll({where: {id:tab2[i].id}});
       ps[i].forEach(elem => tab3.push({
                id: elem.id,
                userId: elem.userId
       }));
       }
       tab4 = Array.from(tab3);
       //res.json(tab4[1].userId);
       let passagerData = [tab4.length];
       let userId;
       let  passagerId;
        for(var i=0; i<tab4.length; i++){
         userId = tab4[i].userId; 
         passagerId = tab4[i].id; 

     passagerData[i] = await sequelize.query(
        'SELECT DISTINCT u.prenom, u.nom, u.telephone,v.type, v.matricule, d.dateHeure, d.destination ' +
        'FROM departs AS d , users AS u ,passagers AS p ,voitures AS v '+
        'WHERE u.id = :userId AND v.id = :vId  AND p.id = :passagerId AND d.voitureId = v.id AND u.id = p.userId AND d.passagerId = p.id',
       
        {
           replacements :{userId ,passagerId,vId},
            type: sequelize.QueryTypes.SELECT,
        }
    );
}
       //console.log(passagerData);
       res.json(passagerData); 
    return passagerData;



    }

    }catch(error){
        console.log(error);
        error = "Error when getting passager from voiture";
        return error;
    }
}
    

 

 const deleteVoiture = async (req,res)=>{
    let message="";
     try{
         const voiture = await Voiture.findByPk(req.params.id);  
         if(voiture != null){    
             await voiture.destroy({where: {id: req.params.id}});
              message = "success";
              res.status(200).send({"message":message});
             return message; 
         }    
       }
     catch(error){
        message = "error";
         error ="Error when deleting Voiture";   
         res.status(500).send({"message":message});
         return message;  
 
     }
 
 }
 async function getVoitureByID(req,res){
    let message ="";
    
    try{
        const voiture= await Voiture.findByPk(req.params.id);
        if(voiture != null){
           message ="success";
           res.status(200).send({"voiture":voiture,"message":message});}
        
        
    }catch(error){
        message ="Error";
        res.status(500).send({"message":message});

    }
}

   

     module.exports = {
      addVoiture,
      getAllVoiture,
      deleteVoiture,
      updateVoiture,
      getPassagers,
      getVoitureByID
    }