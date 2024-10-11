const Usuario = require('../models/Usuario.js');
const bcryptjs = require('bcryptjs');

// mostrar todos los usuarios que tengan el estado: true
const getUsuarios = async (req, res) =>{
    const {hasta, desde} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
              .skip(Number(desde))
              .limit(Number(hasta))
    ]);

    res.json({
        total,
        usuarios
    });
}

const getUsuariosIdCompañia = async (req, res) => {
    try {
        const compañiaId = req.params.id;
        const usuarios = await Usuario.find({ compañia: compañiaId });
        res.json({ usuarios });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuarios por compañía', error });
    }
}


const postUsuarios = async (req, res) => {
    const { nombre, rol, compañia, password} = req.body;

    try {
        const usuario = new Usuario({ nombre, rol, compañia, password });

        // Encriptar una contraseña

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el usuario', error });
    }
};

const deleteUsuarios = async (req, res) =>{
    const {id} = req.params;
    console.log('ID recibido para eliminación:', id);
    // Borrado fisico desde DB
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Borrado virtual 
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, { new: true });
    if (!usuario) {
        return res.status(404).json({ msg: 'usuario no encontrada' });
    }
    res.json({
        msg: 'usuario eliminado correctamente',
        usuario
    })
}

const putUsuarios = async (req, res) =>{
    const {id} = req.params;
    
    const {_id, password, googleSignIn, ...resto} = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true})

    res.json({
        msg: "Usuario actualizado",
        usuario : usuario
    })
}

module.exports = {
    getUsuarios,
    postUsuarios,
    deleteUsuarios,
    putUsuarios,
    getUsuariosIdCompañia
}
