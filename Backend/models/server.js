const express = require('express');
const { dbConnection } = require('../database/config.js');
const cors = require('cors');


class Server {
    constructor(){
        this.app = express();
        
        this.port = process.env.PORT 
        
        this.paths = {
            compañiaPath: '/api/company',
            authPath : '/api/auth',
            usuarioPath : '/api/usuarios',
            authUsuarioPath : '/api/auth',
            categoriasPath: '/api/categorias',
            productosPath: '/api/productos'
        }

        this.connectDB();
        
        this.middlewares();

        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        // Leer y parsear
        this.app.use(express.json());

        this.app.use(cors())
    }

    routes(){
        this.app.use(this.paths.compañiaPath, require("../routes/compañia.routes.js"));
        this.app.use(this.paths.authPath, require("../routes/auth.routes.js"));
        this.app.use(this.paths.usuarioPath, require("../routes/usuario.routes.js"));
        this.app.use(this.paths.authUsuarioPath, require("../routes/authUsuarios.routes.js"));
        this.app.use(this.paths.categoriasPath, require("../routes/categoria.routes.js"));
        this.app.use(this.paths.productosPath, require("../routes/producto.routes.js"));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = Server;