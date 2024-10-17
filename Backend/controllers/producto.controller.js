const Producto = require("../models/Producto");

// Mostrar Categorias
const getProductos = async(req, res)=>{

    const {hasta=8, desde=0} = req.query;
    const query = {estado:true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('categoria', ['nombre'])
            .skip( Number(desde))
            .limit(Number(hasta))
    ]);

    res.json({
        total,
        productos
    })
}

// Mostrar categoria mediante el id y que muestre el id del que registro y el nombre
const getProducto = async (req, res)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario','nombre');
    res.json(producto);
}



const getPorductoIdCategoria = async (req, res) => {
    try {
        const categoriaId = req.params.id;
        const producto = await Producto.find({ categoria: categoriaId });
        res.json({ producto });
        
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener productos por categoria', error });
    }
}



// El methos HHTP post nos deja ingresar la categoria con el usuario correspondiente con la url del token
const postProducto = async (req, res) => {
    const { nombre, categoria} = req.body;

    try {
        const producto = new Producto({nombre, categoria});

        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el producto', error });
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
    getProductos,
    postProducto,
    getProducto,
    putCategorias,
    deleteCategoria,
    getPorductoIdCategoria
}