const Categoria = require('../models/Categoria.js')

// Mostrar Categorias
const getCategorias = async(req, res)=>{

    const {hasta=8, desde=0} = req.query;
    const query = {estado:true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('compañia', ['nombre, email'])
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



// El methos HHTP post nos deja ingresar la categoria con el usuario correspondiente con la url del token
const postCategorias = async(req, res)=>{
    const nombre = req.body.nombre.toUpperCase();
    const compañia = req.body.compañia.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre, compañia})

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        compañia,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);

}

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
    deleteCategoria
}