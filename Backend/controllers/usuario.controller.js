const Usuario = require('../models/Usuario.js');

const getUsuarios = async (req, res) =>{
    res.status(403).json({
        "message": " get Usuarios"
    })
}

const postUsuarios = async (req, res) =>{
    res.status(403).json({
        "message": " post Usuarios"
    })
}

const deleteUsuarios = async (req, res) =>{
    res.status(403).json({
        "message": " delete Usuarios"
    })
}

const putUsuarios = async (req, res) =>{
    res.status(403).json({
        "message": " put Usuarios"
    })
}

module.exports = {
    getUsuarios,
    postUsuarios,
    deleteUsuarios,
    putUsuarios,
}
