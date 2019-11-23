var express = require('express');
var router = express.Router();
const ObraController = require("../controllers/ObraController");

/* GET All registers */
router.get('/', ObraController.getObra);
router.get('/:id', ObraController.getOneObra);
router.post('/', ObraController.insert);
router.put('/', ObraController.update);
router.delete('/', ObraController.deleteById);

module.exports = router;
