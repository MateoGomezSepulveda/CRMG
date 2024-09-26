const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Compañia = require('../models/Compañia.js');

const validateJWT = async (req = request, res = response, next)=>{
    const token = req.header('x-api-token-jwt');

    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {

        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        const compañia = await Compañia.findById(uid);
        
        if(!compañia){
            return res.status(401).json({
                msg: 'Token no válido - compañia no existe DB'
            })
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - compañia con estado: false'
            })
        }

        req.compañia = compañia; 
        console.log("req compañia en validate",req.compañia);
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validateJWT
}