const express = require('express');
const { dbConnection } = require('../database/config.js');

class Server {
    constructor(){
        this.app = express();
        
        this.port = process.env.PORT 
        
        this.paths = {
            usuariosPath: '/api/usuarios'
        }

        this.connectDB();


        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.paths.usuariosPath, require("../routes/usuario.routes.js"));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = Server;