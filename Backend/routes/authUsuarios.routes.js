const {Router} = require('express');
const {check} = require('express-validator');
const { validateDocuments } = require('../middleware/validate.documents.js');
const { loginUsers } = require('../controllers/authUsuarios.controller.js');

const router = Router();

router.post("/loginUsers", [
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateDocuments
],loginUsers)


module.exports = router;