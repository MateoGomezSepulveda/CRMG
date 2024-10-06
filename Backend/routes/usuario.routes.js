const {Router} = require('express');
const {check } = require ('express-validator');
const { getUsuarios, postUsuarios, deleteUsuarios, putUsuarios, getUsuariosIdCompañia } = require('../controllers/usuario.controller');
const { validateDocuments } = require('../middleware/validate.documents');
const { isValidRole, validateCompany } = require('../helpers/db.validators.js');

const router = Router();

router.get("/", getUsuarios);

router.get("/:id", getUsuariosIdCompañia)

router.post("/", [
    check('nombre', 'El Nombre no es válido').not().isEmpty(),
    check('password', 'El password debe ser minimo de 6 letras').isLength({ min: 6 }),
    // Validar si el _id de la compañía existe
    check('compañia', 'El ID de la compañía no es válido').custom(async (id) => {
        await validateCompany(id);
    }),
    // Validar el rol
    check('rol', 'No es un rol valido').isIn(['ADMIN','USER']),
    check('rol').custom(isValidRole),
    validateDocuments
], postUsuarios);

router.delete("/", deleteUsuarios);
router.put("/", putUsuarios);


module.exports = router;