var express = require('express');
var router = express.Router();
const ObraController = require("../controllers/ObraController");

/* GET All registers */
//mostrar todos los obra
router.get('/', ObraController.index);
//mostrar un obra
router.get('/:id',ObraController.findUser);
//insertar obra
router.post('/',ObraController.store);
//actualizar obra
router.put('/:id',ObraController.update);
//eliminando obra
router.delete('/:id',ObraController.delete);

module.exports = router;
