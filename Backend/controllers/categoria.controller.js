const Categoria = require('../models/Categoria.js')

// Mostrar Categorias
const getCategorias = async(req, res)=>{

    const {hasta=8, desde=0} = req.query;
    const query = {estado:true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', ['nombre'])
            .skip( Number(desde))
            .limit(Number(hasta))
    ]);

    res.json({
        total,
        categorias
    })
}

// Mostrar categoria mediante el id y que muestre el id del que registro y el nombre
const getCategoria = async (req, res)=>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario','nombre');
    res.json(categoria);
}



const getCategoriasIdCompañia = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const categorias = await Categoria.find({ usuario: usuarioId });
        res.json({ categorias });
        console.log(categorias);
        
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener categorias por compañía', error });
    }
}



// El methos HHTP post nos deja ingresar la categoria con el usuario correspondiente con la url del token
const postCategorias = async (req, res) => {
    try {
        const nombre = req.body.nombre.toUpperCase();
        const usuario = req.body.usuario; // Aquí recibimos un array de usuarios

        if (!usuario || !Array.isArray(usuario)) {
            return res.status(400).json({
                msg: 'Debes proporcionar un array de usuarios.'
            });
        }

        // Verificar si ya existe una categoría con el mismo nombre y alguno de los usuarios
        const categoriaDB = await Categoria.findOne({
            nombre,
            usuario: { $in: usuario }  // Verifica si al menos uno de los usuarios ya tiene esa categoría
        });

        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoría ${categoriaDB.nombre} ya existe para uno de los usuarios.`
            });
        }

        // Crear el objeto de la categoría con los datos proporcionados
        const data = {
            nombre,
            usuario  // Asociamos la categoría con múltiples usuarios
        };

        const categoria = new Categoria(data);

        // Guardar la categoría en la base de datos
        await categoria.save();

        res.status(201).json({
            msg: 'Categoría creada con éxito',
            categoria
        });
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};
// se actualiza con put el nombre de la categoria toca ponerle el id de la categoria y el token del ADMIN
const putCategorias = async (req,res)=>{
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    res.json(categoria);
}

const deleteCategoria = async (req, res)=>{
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});
    res.json(categoria)
}

module.exports = {
    getCategorias,
    postCategorias,
    getCategoria,
    putCategorias,
    deleteCategoria,
    getCategoriasIdCompañia
}