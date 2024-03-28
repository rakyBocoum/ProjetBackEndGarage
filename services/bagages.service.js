const { where } = require('sequelize');
const db = require('../models');
const { json } = require('body-parser');
const nodemailer = require('nodemailer');

const User = db.User;
const Depart = db.Depart;
const Bagage = db.Bagage;
const voiture = db.Voiture;
const sequelize = db.sequelize
const Passager = db.Passager



const lesPertes = async (req, res) => {
    let message = "";
    let taille = 0;
    try {
        // const pertes = await Bagage.findAll({
        //     where: {
        //         perdu: true
        //     }
        // });
        const pertes = await sequelize.query(
            'SELECT DISTINCT b.id as bagageId, b.libelle, b.quantite,u.id as user, u.prenom, u.nom, p.id ' +
            'FROM bagages AS b, passagers AS p, users AS u ' +
            'WHERE p.userId = u.id AND p.id = b.passagerId AND b.perdu = true',
            {
                type: sequelize.QueryTypes.SELECT
            }
        );
        
        
        if (pertes != null) {
            taille = pertes.length;
            message = "success";
            res.status(200).send({ "message": message, "pertes": pertes, "taille": taille })
        }
    } catch (error) {
       
        message = "erreur de recuperation";
       
       res.status(500).send({ "message": message });
    }
};
const retrieve = async (req, res) => {
    let message = "";
    try
    {
        
        let b = await Bagage.findOne({where : {id:req.params.id, perdu:true}})
        if(b!=null)
        {
            const bagage = await Bagage.update({
               
                perdu: 0,
              
            },{where:{id:req.params.id}});
            message= "success";
            res.status(200).send({"message":message})
        }
        else{
            message= "error of retrieving";
            res.status(200).send({"message":message})
        }
    }catch(error){
        console.log(error);
        message="error"
        res.status(500).send({"message":message})
    }
}




const sendEmail = async (req, res) => {
    let message = " ";
    const passager = await User.findOne({ where: { id: req.params.id } });
    if(passager != null) {
        try {
          

            // Configuration du transporteur Nodemailer

        
            const transporter = nodemailer.createTransport({
                host: "smtp-relay.brevo.com",
                port: 587,
                secure: false,
                auth: {
                    user: "bocoumraky2@gmail.com",
                    pass: "xsmtpsib-3d5df602838742843714a35ab27d4c2359fe4e5ebb357add93cc8581d3361b95-TFbD8R7pca2gIW91",
                },
            })
            // Configuration de l'e-mail
            const mailOptions = {
                from: "bocoumraky2@gmail.com",
                to: passager.email,
                subject: 'Bagage(s) retrouvé(s)',
                text:' Veuillez vous présenter à la gare le plus tôt possible muni(e) de votre pièce d\'identité pour récupérer vos bagages perdus.Merci.Cordialement',
            };

            // Envoi de l'e-mail
            const info = await transporter.sendMail(mailOptions)
        

            message = "success";
            res.status(200).send({ "message":message});

                } catch (error) {
                    console.error(error)
                    message = error.message
                    res.status(500).send({ "message":message });
                }
        }
        else{
            message = "not found"
            res.status(404).send({ "message":message });
        }
    }




module.exports ={
    lesPertes,
    retrieve,
    sendEmail
}