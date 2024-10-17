const {Router} = require('express');
const {check } = require ('express-validator');
const { validateDocuments } = require('../middleware/validate.documents.js');
const { isValidRole, findCompañiaById, findCategoriaById } = require('../helpers/db.validators.js');
const { postProducto, getProductos, getPorductoIdCategoria} = require('../controllers/producto.controller.js');
const { validateJWT } = require('../middleware/validate.JWT.js');
const { isAdminRole } = require('../middleware/validate.Role.js');

const router = Router();


router.get("/", getProductos);

router.get("/:id", getPorductoIdCategoria);


router.post('/', [
    validateJWT,
    isAdminRole,
    check('nombre','El Nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El ID de la categoria no es válido').custom(async (id) => {
        await findCategoriaById(id);
    }),
    // validateDocuments
], postProducto);

router.delete("/:id",[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( findCompañiaById ),
    validateDocuments,
], );

router.put("/", );


module.exports = router;