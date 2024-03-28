const db = require('../models');

const User = db.User;
const Chauffeur = db.Chauffeur;
const Depart = db.Depart;
const Voiture = db.Voiture;
const sequelize = db.sequelize



async function addDepart(req, res) {
    const c = await Voiture.findByPk(req.params.id);
    let message = ""

    if (c != null) {
        try {
            const depart = await Depart.create(
               {
                 dateHeure:req.body.dateHeure,
                 destination: req.body.destination,
                 voiture_id: req.params.id,
               });
           
            message = "success";
            //const depart = await getAllDepart(req, res);
            res.status(200).send({ "message": message, "depart": depart });
            return message;

        } catch (error) {
          
            message = "Error when creating  Depart";
            return res.json({ error: message });
            

            //res.status(500).json({"message":"Voiture ID does not exist"});
        }
    }
    else {
       // let error = "Voiture ID does not exist";
        message = "Error when creating  Depart"
       return res.json({ "error": message });
       // return message;
        //res.status(500).json({"message":"Error when creating Depart"});
    }
}

// const getAllDepart = async (req, res) => {
//     let message = "";
//     let tab5 = [];
//     let  depart = [];
//     try {
//         const tab6 = await sequelize.query(
//             'SELECT DISTINCT u.prenom, u.nom, u.telephone, c.numPermis, v.id ,v.type, v.matricule, d.dateHeure, d.destination ' +
//             'FROM departs AS d ' +
//             'INNER JOIN voitures AS v ON d.voiture_id = v.id ' +
//             'INNER JOIN chauffeurs AS c ON v.chauffeur_id = c.id ' +
//             'INNER JOIN users AS u ON c.userId = u.id ' +
//             'WHERE u.id = :userId AND c.id = :chauffeur_id',
//             {
//                 // replacements: { userId, chauffeurId },
//                 type: sequelize.QueryTypes.SELECT,
//             }
//         );
//         tab6.forEach(elem => tab5.push({
//             prenom: elem.prenom,
//             nom: elem.nom,
//             telephone: elem.telephone,
//             numPermis: elem.numPermis,
//             type: elem.type,
//             matricule: elem.matricule,
//             dateHeure: elem.dateHeure,
//             destination: elem.destination
//         })
//         );
//         depart = Array.from(tab5);
//         message = "success";
//         res.status(200).send({ "message": message, "depart": depart });

//         return message;
//     }
//     catch (error) {
//         message = "Error when getting all depart ";
//         res.status(500).send({ "message": message });
//         //console.log(error);
//         error = "Error when getting All Depart";
//         return message;
//     }
// }
const getAllDepart = async (req, res) => {
    let message = "";
    let tab5 = [];
    try {
        const tab6 = await sequelize.query(
            'SELECT DISTINCT u.prenom, u.nom, u.telephone, c.numPermis,v.id , v.type, v.matricule, d.dateHeure, d.destination ' +
            'FROM departs AS d ' +
            'INNER JOIN voitures AS v ON d.voiture_id = v.id ' +
            'INNER JOIN chauffeurs AS c ON v.chauffeurId = c.id ' +
            'INNER JOIN users AS u ON c.userId = u.id ' +
            'WHERE c.userId = u.id  AND v.chauffeurId = c.id AND d.voiture_id = v.id   ',
            {

                type: sequelize.QueryTypes.SELECT,
            }
        );
        tab6.forEach(elem => tab5.push({
            voitureId: elem.id,
            prenom: elem.prenom,
            nom: elem.nom,
            telephone: elem.telephone,
            numPermis: elem.numPermis,
            type: elem.type,
            matricule: elem.matricule,
            dateHeure: elem.dateHeure,
            destination: elem.destination
        })
        );
        message = "success";
        departData = Array.from(tab5);
        //res.json(departData);
        res.status(200).send({ "message": message, "departData": departData });
        return departData;
    } catch (error) {
        message = "Error";
        res.status(500).send({ "message": message });
        console.log(error)
        return message;
    }
}


async function updateDepart(req, res) {
    let message = "";
    try {
        const depart = await Depart.findByPk({ where: { id: req.params.id } });
        if (depart != null) {
            await depart.update({
                dateHeure:req.body.dateHeure,
               
                destination: req.body.destination,
                //voitureId: req.body.voitureId,
            }, { where: { voitureId: req.params.id } });
            message = "success";
            const depart = await getAllDepart(req, res);
            res.status(200).send({ "message": message, "depart": depart });
            return message;
        }
        else {
            message = "Depart does not exist";
            res.status(500).send({ "message": message });
            let error = "Depart ID does not exist";
            return message;
        }
    }
    catch (error) {
        message = "Error when updating depart";
        res.status(500).send({ "message": message });
        error = "Error when updating Depart";
        return message;
        //res.status(500).json({'Error':'Error when updating Depart'});

    }
}





const deleteDepart = async (req, res) => {
    let message = "";
    try {
        const depart = await Depart.findByPk(req.params.id);
        if (depart != null) {
            depart.destroy({ where: { id: req.params.id } });
            const depart = await getAllDepart(req, res);
            message = "success";
            res.status(200).send({ "message": message, "depart": depart });
            //res.json(depart);
            return message;
        }
        else {
            message = "Depart not found";
            res.status(500).send({ "message": message });
            let error = "Depart ID does not exist";
            return message;
        }
    }
    catch {
        message = "Error when deleting depart";
        res.status(500).send({ "message": message });
        let error = "Error when deleting Depart";
        return message;
        // res.status(500).json({'Error':'Error when deleting Depart'});

    }

}
const AddPassagerInDepart = async (req, res) => {
    let message = "";

    try {
        const passager = await db.Passager.findOne({ where: { Cni: req.body.Cni } });

        if (passager != null) {
            await Depart.update({
                dateHeure:req.params.dateHeure,
                destination: req.params.destination,
                voiture_id: req.params.id,
                passager_id: passager.id,
            },
                {
                    where:{dateHeure:req.params.dateHeure,destination:req.params.destination}}
            )
            message = "success";

            res.status(200).send({ "message": message });
            return message;
        }
        else {
            message = "Passager does not exist";
            res.status(404).send({ "message: ": message });
            return message;
        }

    }
    catch (error) {
        console.log(error);
        message = "Error when adding passager";
        res.status(500).send({ "message": message });
        error = "Error when adding passager";
        return message;

    }


}
// const deletePassagerDepart = async (req, res) => {
//     let message = "";
//     try {
//         const idVoiture= req.params.id;
//         const destination= req.params.destination;
//         const dateHeure= req.params.dateHeure;
//         const passager = await db.Passager.findOne({ where: { Cni: req.body.Cni } });
//         if (passager != null && destination !=null && idVoiture != null &&dateHeure != null){
//             const depart = await Depart.destroy({
//                 dateHeure: req.params.dateHeure,
//                 destination: req.params.destination,
//                 voiture_id: req.params.id,
//                 passager_id: req.params.passager_id,
//             }, { where: { idVoiture: req.params.id } });
//         }
//         message = "sucesss";
//         res.status(200).send({ "message": message,"depart" : depart });

//     }
//     catch (error) {
//         message = "erreur";
//         res.status(500).send({ "message": message });


//     }
// }
const deletePassagerDepart = async (req,res)=>
{
    let message = "";
   
     try{
 
            Depart.destroy({
                where :{
                    voiture_id :req.params.id,
                    dateHeure:req.params.dateHeure,
                    passager_id :req.params.passager_id,
                    destination:req.params.destination
                }
            });
            message = "success";
           res.status(200 ).send({"message": message});
        
                
       }
     catch(error){
        message ="Error when deleting";
        console.log(error);
        res.status(500).send({"message": message});
        // res.status(500).json({'Error':'Error when deleting Depart'});   
 
     }
 
}
async function getDepartById(req,res){
    let message ="";
    
    try{
        const depart= await Depart.findOne({where :{voiture_id : req.params.id , dateHeure:req.params.dateHeure}});
        if(depart != null){
           message ="success";
           res.status(200).send({"depart":depart,"message":message});
        }
        
        
    }catch(error){
        message ="Error";
        res.status(500).send({"message":message});

    }
}
const getPassager = async (req, res) => {
    let message = "";
    let idvoiture = req.params.id;
    let date = req.params.dateHeure;
    let destination = req.params.destination;
    try {
        const passagerData = await sequelize.query(
            'SELECT DISTINCT u.prenom, u.nom, u.adresse, u.telephone, p.Cni, p.id ' +
            'FROM passagers AS p, users AS u, departs AS d ' +
            'WHERE p.userId = u.id AND d.dateHeure= :date AND d.voiture_id = :idvoiture AND d.destination = :destination AND d.passager_id = p.id',
            {
                replacements: { date, idvoiture, destination },
                type: sequelize.QueryTypes.SELECT,
            }
        );
        message = "success";
        res.status(200).send({ "message": message, "passagers": passagerData });
    } catch (error) {
        message = "Error";
        console.error(error); // Utilisez console.error() au lieu de console.log() pour les erreurs
        res.status(500).send({ "message": message });
    }
}


module.exports = {
    addDepart,
    getAllDepart,
    updateDepart,
    deleteDepart,
    AddPassagerInDepart,
    getPassager,
    deletePassagerDepart,
    getDepartById
}