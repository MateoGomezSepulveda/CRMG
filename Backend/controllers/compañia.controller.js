const Compañia = require('../models/Compañia.js');
const bcryptjs = require('bcryptjs');


// mostrar todos los usuarios que tengan el estado: true
const getCompañias = async (req, res) =>{
    const {hasta, desde} = req.query;
    const query = {estado: true};

    const [total, compañias] = await Promise.all([
        Compañia.countDocuments(query),
        Compañia.find(query)
              .skip(Number(desde))
              .limit(Number(hasta))
    ]);

    res.json({
        total,
        compañias
    });
}

const postCompañias = async (req, res) =>{
    
    const { nombre, email, password} = req.body;
    const compañia = new Compañia({nombre, email, password});

    // Encriptar una contraseña

    const salt = bcryptjs.genSaltSync();
    compañia.password = bcryptjs.hashSync(password, salt);

    await compañia.save();
    res.json({
        message: 'Usuario creado correctamente',
        compañia
    });
}

const deleteCompañias = async (req, res) =>{
    const {id} = req.params
    // Borrado fisico desde DB
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Borrado virtual 
    const compañia = await Compañia.findByIdAndUpdate(id, { estado: false }, { new: true });

    if (!compañia) {
        return res.status(404).json({ msg: 'Compañía no encontrada' });
    }

    res.json({
        msg: 'Compañía eliminada correctamente',
        compañia
    });
}

const putCompañias = async (req, res) =>{
    const {id} = req.params;
    
    const {_id, password, googleSignIn, ...resto} = req.body;

    const compañia = await Compañia.findByIdAndUpdate(id, resto, {new:true})

    res.json({
        msg: "compañia actualizado",
        compañia : compañia
    })
}

module.exports = {
    postCompañias,
    deleteCompañias,
    putCompañias,
    getCompañias
}
