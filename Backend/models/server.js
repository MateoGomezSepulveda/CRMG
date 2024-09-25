const express = require('express');
const { dbConnection } = require('../database/config.js');
const cors = require('cors');


class Server {
    constructor(){
        this.app = express();
        
        this.port = process.env.PORT 
        
        this.paths = {
            usuariosPath: '/api/usuarios',
            authPath : '/api/auth'
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
        this.app.use(this.paths.usuariosPath, require("../routes/usuario.routes.js"));
        this.app.use(this.paths.authPath, require("../routes/auth.routes.js"));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = Server;