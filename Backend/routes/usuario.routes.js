const {Router} = require('express');
const {check, validationResult } = require ('express-validator');
const { getUsuarios, postUsuarios, deleteUsuarios, putUsuarios } = require('../controllers/usuario.controller');

const router = Router();

router.get("/", getUsuarios);

router.post("/", [
    check('nombre', 'El Nombre no es valido').not().isEmpty(),
    check('password', 'El password debe ser minimo de 6 letras').isLength({ min: 6 }),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, postUsuarios);

router.delete("/", deleteUsuarios);
router.put("/", putUsuarios);


module.exports = router;