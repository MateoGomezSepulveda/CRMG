const {Router} = require('express');
const { getUsuarios, postUsuarios, deleteUsuarios, putUsuarios } = require('../controllers/usuario.controller');

const router = Router();

router.get("/", getUsuarios);
router.post("/", postUsuarios);
router.delete("/", deleteUsuarios);
router.put("/", putUsuarios);


module.exports = router;