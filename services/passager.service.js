const { where } = require('sequelize');
const db = require('../models');
const { json } = require('body-parser');

const User = db.User;
const Depart = db.Depart;
const Bagage = db.Bagage;
const voiture = db.Voiture;
const sequelize = db.sequelize
const Passager = db.Passager


const getAllPassager = async (req, res) => {
    let message = "";
    try {
        let tab1 = [];
        let passagers = [];
        const passagerData = await sequelize.query(
            'SELECT DISTINCT u.prenom, u.nom, u.telephone,u.adresse,p.Cni,p.id ' +
            'FROM passagers AS p , users AS u' +
            ' WHERE p.userId = u.id ',
            {
                type: sequelize.QueryTypes.SELECT
            }
        );

        passagerData.forEach(elem => tab1.push({
            id: elem.id,
            prenom: elem.prenom,
            nom: elem.nom,
            telephone: elem.telephone,
            adresse: elem.adresse,
            Cni: elem.Cni,

        }));
        passagers = Array.from(tab1);
        console.log(passagers);
        message = "success";
        res.status(200).send({ "message": message, "passagers": passagers });
        return passagers;
    }
    catch (error) {
        console.log(error);
        message = "success"
        error = "Error when getting all Passagers"
        res.status(200).send({ "message": message });

        return error;
    }
}

async function addBagage(req, res) {

    let message = "";
    const c = db.Passager.findByPk(req.params.id);

    if (c != null) {
        const bagage = await Bagage.create({
            libelle:req.body.libelle,
            quantite:req.body.quantite,
            dateEnregistrement:req.body.dateEnregistrement,
            passagerId:req.params.id,
            // libelle: req.body.libelle,
            // quantite: req.body.quantite,
            // dateEnregistrement: req.params.dateHeure,
            // perdu:0,
            // passagerId: req.params.id,


        })
        // const bagage = await getBagPassager(req, res);
        message = "success"
        res.status(200).send({ "message": message, "bagage": bagage });
        //res.json(depart);
        return bagage;
    }
    else {
        message = "error"
        let error = "Error when adding Bagage";
        res.status(200).send({ "message": message });
        return error;


    }
}
const getBagPassager = async (req, res) => {
    const passager = await db.Passager.findByPk(req.params.id);
    let message = "";
    if (passager != null) {
        await Bagage.findAll({ where: { passagerId: req.params.id } }).then((data) => {
            let tab = [];
            let bagages = [];
            data.forEach(elem => {
                tab.push({
                    id: elem.id,
                    libelle: elem.libelle,
                    quantite: elem.quantite,
                    createdAt: elem.createdAt
                })
            });
            bagages = Array.from(tab);
            message = "success";
            res.status(200).send({ "message": message, "bagages": bagages });
            //res.json(bagage);
            return bagages;
            //res.json(tab2);
            //console.log(tab2);
        }).catch((error) => {
            console.log(error);
            message = "erreur";
            error = "Error when getting Bagage from Passager";
            res.status(500).send({ "message": message });
            return error;

            //console.log(error);
            //res.status(500).json({"Message":"Error when getting Bagage from Passager"});
        });
    }
    else {
        error = "Passager ID does not exist";
        return error;
    }
}
const deletePassager = async (req, res) => {
    let message = "";
    try {

        const passager = await Passager.findByPk(req.params.id);
        if (passager != null) {

            Passager.destroy({ where: { id: req.params.id } });
            User.destroy({ where: { id: passager.userId } });
            message = "success";
            res.status(200).send({ "message": message });
            return message;

            //const chauffeurs = await getAllChauffeur(req, res);
            //res.json(chauffeurs);
            //return chauffeurs
        }
    }
    catch (error) {
        message = "Error ";
        console.log(error);
        res.status(500).send({ "message": message });
        return message;

    }
}
const BagagePassagerDepart = async (req, res) => {
    let message = "";
    const destination = req.params.destination;
    const dateHeure = req.params.dateHeure;
    try {
        const BagagePassagerDepart = await sequelize.query(
            'SELECT DISTINCT b.libelle, b.quantite, d.dateHeure, d.destination, v.type,p.prenom, p.nom ' +
            'FROM bagages as b, passagers AS p, departs as d, voitures as v , users as u' +
            'INNER JOIN voitures AS v ON d.voiture_id = v.id ' +
            'INNER JOIN passagers AS p ON d.passager_id = p.id ' +
            'WHERE p.id = u.id  AND b.perdu = false AND d.passager_id = b.passagerId AND b.passagerId = p.id AND d.passagerId = p.id AND d.dateHeure = b.dateEnregistrement ',
            {
                type: sequelize.QueryTypes.SELECT,
            }

        );



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des départs.' });
    }
}



 const addPerte = async (req,res) =>{
    let message = "";
    try
    {
        let b = await Bagage.findOne({where : {id:req.params.id, perdu:0}})
        if(b!=null)
        {
            const bagage = await Bagage.update({
               
                perdu: 1,
              
            },{where:{id:req.params.id}});
            message= "success";
            res.status(200).send({"message":message})
        }
        else{
            message= "existing";
            res.status(200).send({"message":message})
        }
    }catch(error){
        console.log(error);
        message="error"
        res.status(500).send({"message":message})
    }
 }




async function updateBagage(req, res) {
    let message = ""
    try {

        const bagage = await Bagage.findOne({ where: { id: req.params.id } });
        const idPassager = bagage.passagerId;
        if (bagage != null) {
            const bagages = await Bagage.update({
                libelle: req.body.libelle,
                quantite: req.body.quantite,
                createdAt: req.body.updatedAt,
            }, { where: { id: req.params.id } });

            message = "success";
            console.log(idPassager);
            //res.json(bg);
            console.log(bagage);
            res.status(200).send({ "message": message, "idPassager": idPassager });
            return message;
        }
    }
    catch (error) {
        error = "Error when updating Bagage";
        console.error(error);
        message = "Error when updating Bagage";
        res.status(500).json({ "message": message });
        return message;
    }
}






const deleteBagage = async (req, res) => {
    let message = ""
    try {
        const bagage = await Bagage.findByPk(req.params.id);
        if (bagage != null) {
            await Bagage.destroy({ where: { id: req.params.id } });
            message = "success";
            res.status(200).send({ "message": message });
            return message;
        }
    }
    catch (error) {
        message = "Error";
        console.log(error);
        res.status(500).send({ "message": message });
        return message;

    }

}
async function getPassagerByID(req, res) {
    let message = "";
    let user;
    try {
        const passager = await Passager.findByPk(req.params.id);
        if (passager != null) {
            user = await User.findByPk(passager.userId);
            message = "success";
            res.status(200).send({ "passager": passager, "user": user, "message": message });
        }


    } catch (error) {
        message = "Error";
        res.status(500).send({ "message": message });

    }
}
async function PassagerID(req, res) {
    let message = "";
    //const userId=req.params.userId;
    try {
        const passager = await Passager.findOne({ where: { userId: req.params.id } })
        message = "success"
        res.status(200).send({ "message": message, "passager": passager })


    }
    catch (error) {
        message = "error"
        res.status(500).send({ "message": message });
    }

}
async function PassagerIdByDepart(req, res) {
    let message = "";
    //const userId=req.params.userId;
    try {
        const passager = await Passager.findOne({ where: { userId: req.params.id } })
        if (passager != null) {
            let idPassager = passager.id;


            const departData = await sequelize.query(
                'SELECT DISTINCT  v.type, v.matricule, d.dateHeure, d.destination ' +
                'FROM departs AS d ' +
                'INNER JOIN voitures AS v ON d.voiture_id = v.id ' +
                'WHERE d.passager_id = :idPassager',
                {
                    replacements: { idPassager },
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            message = "success"
            res.status(200).send({ "message": message, "departData": departData })

        }


    }
    catch (error) {
        message = "error"
        console.log(error);
        res.status(500).send({ "message": message });
    }


}



module.exports = {
    addBagage,
    getBagPassager,
    updateBagage,
    deleteBagage,
    getAllPassager,
    getPassagerByID,
    deletePassager,
    PassagerID,
    PassagerIdByDepart,
    //lesPertes,
    addPerte

}