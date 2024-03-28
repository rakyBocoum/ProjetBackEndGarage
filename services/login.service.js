//const { User } = require('../db/sequelize')
const { Op } = require('sequelize');
const db = require("../models");
const User = db.User;
const bcrypt = require('bcryptjs');
//const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privatekey = require('../auth/private_key')

//app.post('/api/login', (req, res) => 




function login(req, res) {
let message="";
    User.findOne({ where: { email: req.body.email } }).then(user => {
        if (!user) {
            const message = 'l_utilisateur demande n_existe pas'
             res.status(404).json({ message })
        }


        bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if (!isPasswordValid) {
                const message = `Le mot de passe est incorrecte`;
                 res.status(404).send({ "message":message })
            }
            //JWT
            const token = jwt.sign(
                { userId: user.id },
                privatekey,
                { expiresIn: "24h" }
            )
          const  iduser = user.id
            console.log(iduser)
            const message = `L'utilisateur a été connecté avec succès2`;

            const islogin = 'true';
             res.status(200).send({"user":user,"token":token,"message":message,"islogin":islogin })
        })
    })
        .catch(error => {
            const message = 'l_utilisateur n_a pas pu etre connecte avec succes'
             res.send({ "message":message, data: error })
        })
}
function logout(req, res) {

}
module.exports = { login, logout }