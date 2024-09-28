const {Router} = require('express');
const {check } = require ('express-validator');
const { getCompañias, postCompañias, deleteCompañias, putCompañias} = require('../controllers/compañia.controller');
const { validateDocuments } = require('../middleware/validate.documents.js');
const { isValidRole, emailExiste, findCompañiaById } = require('../helpers/db.validators.js');

const router = Router();

router.get("/", getCompañias );

router.post("/", [
    check('nombre', 'El Nombre no es valido').not().isEmpty(),
    check('password', 'El password debe ser minimo de 6 letras').isLength({ min: 6 }),
    // validator si emailExiste
    check('email').custom(emailExiste),
    // check('rol', 'No es un rol valido').isIn(['ADMIN','USER']),
    // check('rol').custom(isValidRole),
    validateDocuments
], postCompañias);

router.delete("/:id",[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( findCompañiaById ),
    validateDocuments,
], deleteCompañias);

router.put("/", putCompañias);


module.exports = router;