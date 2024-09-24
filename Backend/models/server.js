const express = require('express');

class Server {
    constructor(){
        this.app = express();
        
        this.port = process.env.PORT 
        
        this.paths = {
            usuariosPath: '/api/usuarios'
        }

        this.routes();
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