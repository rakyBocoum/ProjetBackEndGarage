
const db = require("../models");
const { Op } = require('sequelize');
const Bcrypt = require('bcryptjs');
require('dotenv');
const User = db.User;
const Passager = db.Passager;
const Chauffeur = db.Chauffeur;

/*function createUser(req, res) {
    const userWithCryptedPassword={prenom:req.body.prenom,nom:req.body.nom,telephone:req.body.telephone,adresse:req.body.adresse,email: req.body.email,password:Bcyprypt.hashSync(req.body.password),role:req.body.role}
    User.create(userWithCryptedPassword)
        .then(data => {
            res.json(data);
        }).catch(
            err => {
                res.status(500).json({ "err": "error creating user" });
            })
};*/
// function registerUserPassager(req, res) {
//     let message = "";
//     User.findOne({ where: { email: req.body.email } }).then((existingUser) => {
//         if (existingUser) {
//             // L'adresse e-mail est déjà utilisée
//             return res.status(400).send({ message: "Cette adresse e-mail est déjà enregistrée." });
//         } else 
//         {
//     User.create({
//         prenom: req.body.prenom,
//         nom: req.body.nom,
//         adresse: req.body.adresse,
//         telephone: req.body.telephone,
//         email: req.body.email,
//         password: Bcrypt.hashSync(req.body.password),
//     }).then((data) => {
//         Passager.create({

//             Cni: req.body.Cni,
//             userId: data.id
//         }).then((data) => { console.log(data); });
//         message = "successfully"
//         console.log(req.body.Cni)
//         res.status(200).send({ "message": message });
//         return message;
//         //res.json(data);


//     }).catch((error) => {
//         console.log(error);
//         message = "Error";
//         res.status(500).send({ "message": message });
//         return message;
//     })
// }
// }
// const registerUserPassager= async function(req, res) {
//     const existingPassager = await Passager.findOne({ where: { Cni: req.body.Cni } });
//     await User.findOne({ where: { email: req.body.email } }).then(async (existingUser) => {
//         if (existingUser) {
//             message = "already"
//             return res.status(400).send({ "message": message });
//             // L'adresse e-mail est déjà utilise
//         }
//         else {

//             if (existingPassager) {
//                 message = "cni already existing"
//                 return res.status(400).send({ "message": message });
//             }
//         }


//         if (existingUser != null) {
//             if (existingPassager != null) {

//                 // L'adresse e-mail est unique, créer l'utilisateur et le passager
//                 User.create({
//                     prenom: req.body.prenom,
//                     nom: req.body.nom,
//                     adresse: req.body.adresse,
//                     telephone: req.body.telephone,
//                     email: req.body.email,
//                     password: Bcrypt.hashSync(req.body.password),
//                 }).then((user) => {
//                     Passager.create({
//                         Cni: req.body.Cni,
//                         userId: user.id
//                     }).then(() => {
//                         message = "successfully"
//                         res.status(200).send({ "message": message });
//                     }).catch((error) => {
//                         console.log(error);
//                         message = "Erreur lors de la creation du passager"
//                         res.status(500).send({ "message": message });
//                     });
//                 }).catch((error) => {
//                     console.log(error);
//                     message = "Erreur lors de la creation de l'utilisateur"
//                     res.status(500).send({ "message": message });
//                 });
//             }

//         }

//     }).catch((error) => {
//         console.log(error);
//         res.status(500).send({ "message": "Erreur lors de la vérification de l'adresse e-mail." });
//     });
// }
const registerUserPassager = async function (req, res) {
    let message = "";

    try {
        const existingUser = await User.findOne({ where: { email: req.body.email } });
        const existingPassager = await Passager.findOne({ where: { Cni: req.body.Cni } });

        if (existingUser) {
            message = "already";
            return res.json({ error: message });
        }

        if (existingPassager) {
            message = "CNI already";
            return res.json({ error: message });
        }

        // L'adresse e-mail et la CNI sont uniques, créer l'utilisateur et le passager
        const user = await User.create({
            prenom: req.body.prenom,
            nom: req.body.nom,
            adresse: req.body.adresse,
            telephone: req.body.telephone,
            email: req.body.email,
            password: Bcrypt.hashSync(req.body.password),
        });

       const passagerData= await Passager.create({
            Cni: req.body.Cni,
            userId: user.id
        });

        message = "success";
        res.status(200).send({ "message": message});
    } catch (error) {
        console.log(error);
        message = "passager existing";
        res.status(500).send({ "message": message });
    }
};


// async function registerUserChauffeur(req, res) {
//     let message = ""
//     let existingChauffeur = await Chauffeur.findOne({ where: { numPermis: req.body.numPermis } })
//     await User.findOne({ where: { email: req.body.email } }).then((existingUser) => {

//         if (existingUser) {
//             message = "already."
//             // L'adresse e-mail est déjà utilisée
//             return res.status(400).send({ "message": message });
//         }
//         else {
//             if (existingChauffeur) {
//                 message = "chauffeur already exist"

//             }
//         }
//         if (existingUser != null) 
//         {
//             if (existingChauffeur != null) 
//             {
//                 // L'adresse e-mail est unique, créer l'utilisateur et le passager
//                 User.create({
//                     prenom: req.body.prenom,
//                     nom: req.body.nom,
//                     adresse: req.body.adresse,
//                     telephone: req.body.telephone,
//                     email: req.body.email,
//                     password: Bcrypt.hashSync(req.body.password),
//                     role: "chauffeur",
//                 }).then((data) => {
//                     if (data.role == "chauffeur") {
//                         Chauffeur.create({
//                             numPermis: req.body.numPermis,
//                             userId: data.id
//                         }).then((data) => {
//                             message = "successfully"
//                             res.json({message, data})
//                            //res.status(200).send({ "message": message });
//                         }).catch((error) => {
//                             console.log(error);
//                             message = "Erreur lors de la creation du chauffeur"
//                             res.json({message});
//                            // res.status(500).send({ "message": message });
//                         });
//                     }
//                 }).catch((error) => {
//                     console.log(error);
//                     message = "Erreur lors de la creation de l'utilisateur"
//                     res.status(500).send({ "message": message });
//                 });
//             }
//         }


//     }).catch((error) => {
//         console.log(error);
//         res.status(500).send({ "message": "Erreur lors de la vérification de l'adresse e-mail." });
//     });

// }
const registerUserChauffeur = async function(req, res) {

    try {
        let message = "";

        const [existingUser, existingChauffeur] = await Promise.all([
            User.findOne({ where: { email: req.body.email } }),
            Chauffeur.findOne({ where: { numPermis: req.body.numPermis } })
        ]);

        if (existingUser) {
            message = "already";
            return res.json({ error: message });
        }

        if (existingChauffeur) {
            message = "chauffeur already exist";
            return res.json({ error: message });
        }

        // L'adresse e-mail est unique, créer l'utilisateur et le passager
        const hashedPassword = Bcrypt.hashSync(req.body.password, 10);

        const userData = await User.create({
            prenom: req.body.prenom,
            nom: req.body.nom,
            adresse: req.body.adresse,
            telephone: req.body.telephone,
            email: req.body.email,
            password: Bcrypt.hashSync(req.body.password),
            role: "chauffeur",
        });

        if (userData.role === "chauffeur") {
            const chauffeurData = await Chauffeur.create({
                numPermis: req.body.numPermis,
                userId: userData.id
            });

            message = "success";
            return res.status(200).json({ "message": message});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
}
// User.create({
//     prenom: req.body.prenom,
//     nom: req.body.nom,
//     adresse: req.body.adresse,
//     telephone: req.body.telephone,
//     email: req.body.email,
//     password: Bcrypt.hashSync(req.body.password),
//     role:"chauffeur",

// }).then((data) => {
//     if (data.role == "chauffeur") {
//         Chauffeur.create({
//             numPermis: req.body.numPermis,
//             userId: data.id
//         }).then((data) => {
//             console.log(data);
//             message = "success";
//             console.log(req.body.numPermis)
//             res.status(200).send({ "message": message });
//             return message;
//     }).
//             catch((error) => {
//                 console.log(error)
//                 message = "Error";
//                 res.status(500).send({ "message": message });
//                 return message;
//             });
//     }

// })






const getAllUsers = async (req, res) => {
    try {
        const all = await User.findAll()
        if (all) {
            return res.json(all);

        }
        res.json({ message: "User not found" })

    } catch (error) {
        res.status(500).json({ "error": "Error when retrieving all users" })
    }
};
function getUserById(req, res) {
    User.findByPk(req.params.id).then((data) => {

    }).catch((error) => {
        res.status(500).json({ "error": "Error when getting user" });
    });
}
const deleteUser = async function (req, res) {
    try {
        const id = req.params.id;
        const userFound = await User.findByPk(id)

        if (userFound) {
            await userFound.destroy()
            res.json({ "message": "user deleted successfully" })
        }
    } catch (error) {
        res.status(500).json({ "message": "error of deleting user" })
    }
};
// async function updateUSer(req, res) {
//     //const c = await User.findByPk(req.params.id);
//     let message = ""
//     try {
//         const id = req.params.id;
//         const userFound = await User.findByPk(id)

//         if (userFound) {
//             const passager = await userFound.update(req.body)
//             //paysFound ={id,...req.body}
//             console.log(userFound);
//             message ="success"
//             res.status(200).send({ "message": message,"passager": passager});
//             return message;
//         }
//     } catch (error) {

//         console.log(error)
//         message = "Error";
//         res.status(500).send({ "message": message });
//         return message;
//     }
// }
async function updatePassager(req, res) {
    let message = "";
    try {
        const passager = await Passager.findByPk(req.params.id);

        if (passager != null) {
            const user = await User.findByPk(passager.userId);


            Passager.update({
                Cni: req.body.Cni
            }, {
                where: {
                    id: passager.id
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
    catch (error) {
        message = "Error";
        console.log(error);
        res.status(500).send({ "message": message });
        return message;

    }
}


/*function signIn(req, res) {
    User.findOne({where: {username:req.body.username}},{include:{
        model: db.Role,
        as: 'roles'
    }}).then(user=>{
        if(Bcyprypt.compareSync(req.body.password,user.password)){
            const playloader = {
                userId :user.id,
                username : user.username,
                roles : user.roles
            }
            const options ={
                expiresIn: '1h'//Le token expirera au bout de 1h
            }
            const token = auth.generateToken(playloader,process.env.SECRET_KEY ,options,)
            res.json({"token":token})


        }
        else{
            res.status(401).json({"error":" password incorrect"});
        }
    }).catch(error=>{
        res.status(500).json({"error":"Unauthorized user"});

    })
}*/





module.exports = {
    registerUserChauffeur,
    registerUserPassager,
    getAllUsers,
    getUserById,
    deleteUser,
    updatePassager,
    //createUserWithRole,
    // signIn
}