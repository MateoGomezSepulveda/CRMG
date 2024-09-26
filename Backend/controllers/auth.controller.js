const {response} = require('express');
const Compañia = require('../models/Compañia.js');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate.JWT.js');

const login = async (req, res=response) =>{
    const {email, password} = req.body
    try {
        // Verificar si existe el email en la base de datos
        const compañia = await Compañia.findOne({email})

        if(!compañia){
            return res.status(400).json({
                msg: "El email no existe"
            });
        }

        // Verificar si el usuario esta activo
        if(!compañia.estado){
            return res.status(400).json({
                msg: "Estado inactivo"
            })
        }
        // Verificar el password es correcto y coincide con la llave
        const passwordValidate = bcryptjs.compareSync(password, compañia.password);
        if(!passwordValidate){
            return res.status(400).json({
                msg: "El password no es correcto"
            });
        }

        //Generacion para Validacion de JSON WEB TOKEN 
        const token = await generateJWT(compañia.id)

        res.json({
            compañia,
            token
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "Datos insuficinetes, contacte a servicio tecnico"
        });
    }
    
}

module.exports = {
    login
}