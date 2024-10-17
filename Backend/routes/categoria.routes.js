const {Router} = require('express');
const {check} = require('express-validator');
const { postCategorias, getCategorias, getCategoria, putCategorias, deleteCategoria, getCategoriasIdCompañia} = require('../controllers/categoria.controller.js');
const { validateDocuments } = require('../middleware/validate.documents.js');
const { validateJWT } = require('../middleware/validate.JWT.js');
const { findCategoryById, userExistsById } = require('../helpers/db.validators.js');
const { isAdminRole } = require('../middleware/validate.Role.js');

const router = Router();

router.get('/', getCategorias)


// router.get('/:id', [
//     check('id', 'No es un id de Mongo valido').isMongoId(),
//     check('id').custom(findCategoryById),
//     validateDocuments,
// ],getCategoria)

router.get("/:id", getCategoriasIdCompañia)


router.post('/', [
    validateJWT,
    isAdminRole,
    check('nombre','El Nombre es obligatorio').not().isEmpty(),
    check('compañia', 'El ID de la compañia no es válido').custom(async (id) => {
        await userExistsById(id);
    }),
    // validateDocuments
], postCategorias);


router.put('/:id', [
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(findCategoryById),
    validateDocuments,
],putCategorias)


router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( findCategoryById ),
    validateDocuments,
],deleteCategoria)

module.exports = router;