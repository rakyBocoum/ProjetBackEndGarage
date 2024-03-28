const db = require('../models');

const User = db.User;
const Chauffeur = db.Chauffeur;
const Voiture = db.Voiture;
const sequelize = db.sequelize




const getAllChauffeur = async (req, res) => {
    let message = "";
    try {
        let tab1 = [];
        let chauffeurs = [];
        const chauffeurData = await sequelize.query(
            'SELECT DISTINCT  u.prenom, u.nom, u.telephone,u.adresse ,c.numPermis, c.id ' +
            'FROM chauffeurs AS c , users AS u' +
            ' WHERE c.userId = u.id',
            {
                type: sequelize.QueryTypes.SELECT,
            }
        );
        chauffeurData.forEach(elem => tab1.push({
            id: elem.id,
            prenom: elem.prenom,
            nom: elem.nom,
            adresse: elem.adresse,
            telephone: elem.telephone,
            numPermis: elem.numPermis,
        }));
        chauffeurs = Array.from(tab1);
        console.log(chauffeurs)
        message = "successfully";
        res.status(200).send({ "message": message, "chauffeurs": chauffeurs });
        return chauffeurs;
    }
    catch (error) {
        message = "error"
        error = "Error when getting all Chauffeurs"
        res.status(200).send({ "message": message });
        return error;
    }
}



async function updateChauffeur(req, res) {

    let message = "";
    try {
        const chauffeur = await Chauffeur.findByPk(req.params.id);

        if (chauffeur != null) {
            const user = await User.findByPk(chauffeur.userId);


            Chauffeur.update({
                numPermis: req.body.numPermis
            }, {
                where: {
                    id: chauffeur.id
                }
            }
            );

            User.update(
                {
                    prenom: req.body.prenom,
                    nom: req.body.nom,
                    adresse: req.body.adresse,
                    telephone: req.body.telephone,
                }, { where: { id: user.id } }
            );

            message = "success";
            res.status(200).send({ "message": message });
            return message;


        }
    }
    catch(error){
        message = "Error";
        console.log(error);
        res.status(500).send({"message":message}); 
     return message;
 
    }
}

const getVoitures = async (req, res) => {
    try {

        var tab1 = [];
        var tab2 = [];

        const vt = await Voiture.findAll({ where: { ChauffeurId: req.params.id } });
        // console.log(ps);
        vt.forEach(elem => tab1.push(
            {
                id: elem.id,
                chaufId: elem.chauffeurId,
            }
        ));
        tab2 = Array.from(tab1);
        //console.log(tab2);
        //let passagerData = [tab2.length];

        const chauffeurId = tab2[0].chaufId;
        const voitureData = await sequelize.query(
            'SELECT DISTINCT v.type, v.matricule ' +
            'FROM voitures AS v , chauffeurs AS c ' +
            'WHERE v.chauffeurId = chauffeurId',
            {
                replacements: { chauffeurId },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        //console.log(voitureData);
        //res.json(voitureData); 
        return voitureData;
    } catch (error) {
        error = "Error when getting voiture from chauffeur";
        //res.json(error);
        return error;
    }
}




const deleteChauffeur = async (req, res) => {
    let message = ""
    try {
        let tab1 = [];
        let tab2 = [];
        const chauffeur = await Chauffeur.findAll({ where: { id: req.params.id } });
        if (chauffeur != null) {
            chauffeur.forEach(elem => tab1.push(
                {
                    userId: elem.userId,
                }
            ));
            tab2 = Array.from(tab1);
            Chauffeur.destroy({ where: { id: req.params.id } });
            User.destroy({ where: { id: tab2[0].userId } });
            message = "success";
            res.status(200).send({ "message": message });
            return message;

            
        }
    }
    catch (error) {
        message = "Error";
        console.log(error);
        res.status(500).send({"message":message}); 
     return message;

    }

}

async function getChauffeurByID(req, res) {
    let message = "";
    let user;
    try {
        const chauffeur = await Chauffeur.findByPk(req.params.id);
        if (chauffeur != null) {
            user = await User.findByPk(chauffeur.userId);
            message = "success";
            res.status(200).send({ "chauffeur": chauffeur, "user": user, "message": message });
        }


    } catch (error) {
        message = "Error";
        res.status(500).send({ "message": message });

    }
}


module.exports = {
    getAllChauffeur,
    deleteChauffeur,
    updateChauffeur,
    getVoitures,
    getChauffeurByID
}