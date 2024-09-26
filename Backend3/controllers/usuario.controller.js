const Usuario = require('../models/Usuario.js');

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

const postUsuarios = async (req, res) => {
    const { nombre, rol, compañia } = req.body;

    try {
        const usuario = new Usuario({ nombre, rol, compañia });
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el usuario', error });
    }
};

const deleteUsuarios = async (req, res) =>{
    const {id} = req.params
    // Borrado fisico desde DB
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Borrado virtual 
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json(usuario)
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
}
