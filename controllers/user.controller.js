const express = require("express");
const { registerUserChauffeur,registerUserPassager, getAllUsers, getUserById, updatePassager, deleteUser } = require("../services/user.service");
const {login} = require("../services/login.service");

//const { sign } = require("jsonwebtoken");

const routes = express.Router();

//routes.post ('/create',createUserWithRole);
routes.post ('/register',registerUserPassager);
routes.post('/createChauffeur',registerUserChauffeur);
routes.get('/all',getAllUsers);
routes.get('/id',getUserById);
routes.put ('/update/:id',updatePassager);
routes.delete('/delete/:id',deleteUser);
routes.post('/login',login);
//routes.post('/login',signIn);

module.exports = routes