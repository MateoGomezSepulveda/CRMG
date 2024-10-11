const Role = require ('../models/Role.js');
const mongoose = require('mongoose');
const Compañia = require('../models/Compañia.js');

const isValidRole = async(rol= '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la Base de datos`);
    }
}

const emailExiste = async(email= '')=>{
    const existeEmail = await Compañia.findOne({email});
    if(existeEmail){
        throw new Error(`El email ${email}, ya esta registrado`);
    }
}

const validateCompany = async (_id = '') => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error(`El ID ${_id} no es un ObjectId válido`);
    }

    const existeCompañia = await Compañia.findById(_id);
    if (!existeCompañia) {
        throw new Error(`La compañía con ID ${_id} no está registrada en la base de datos`);
    }
};

const validateUsuario = async (_id = '') => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error(`El ID ${_id} no es un ObjectId válido`);
    }

    const existeUsuario = await Usuario.findById(_id);
    if (!existeUsuario) {
        throw new Error(`El usuario con ID ${_id} no está registrada en la base de datos`);
    }
};

const findCompañiaById = async(id)=>{
    const findCompañia = await Compañia.findById(id);
    if(!findCompañia){
        throw new Error(`El id de la categoria no existe ${id}`);
    }
}

const userExistsById = async(id) =>{
    const userExists = await Usuario.findById(id);
    if(!userExists){
        throw new Error(`El id (usuario) no existe ${id}`);
    }
}

module.exports = {
    isValidRole,
    emailExiste,
    validateCompany,
    findCompañiaById,
    userExistsById,
    validateUsuario
}