const Role = require ('../models/Role.js');
const Usuario = require('../models/Usuario.js');

const isValidRole = async(rol= '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la Base de datos`);
    }
}

const emailExiste = async(email= '')=>{
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`El email ${email}, ya esta registrado`);
    }
}

module.exports = {
    isValidRole,
    emailExiste
}