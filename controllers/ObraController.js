//obtener todo
const Obra =require('../models/Obra');
const obraController = {};

//mostrar todos los usuarios
obraController.index = async function (req, res, next) {
    let obras = await Obra.find();
    return res.status(200).json(obras);
}

//buscar usuario
obraController.findUser = async function (req, res, next) {
    let { id } = req.params;
    let obra = await Obra.findById(id).catch(err => {
        return next(res);
    });
    return res.status(200).json(obra);
}
//crear usuario
obraController.store = async function (req, res, next) {
    let obra = new Obra();
    obra.nombre = req.body.nombre;
    obra.fecha = req.body.fecha;
    obra.tipo = req.body.tipo;
    obra.invaluable = req.body.invaluable;

    try {
        await obra.save();
        return res.status(200).json({ "message": "Usuario agregado con exito" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Por favor revise sus datos" });
    }

}

//modificar usuario
obraController.update = async function (req, res, next) {
    let { id } = req.params;
    let obra = {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        tipo: req.body.tipo,
        invaluable: req.body.invaluable
    }
    console.log(obra);
    try {
        await Obra.update({ _id: id }, obra);
        res.status(200).json({ "message": "Usuario actualizado con exito" });
    }
    catch (err) {
        return res.status(500).json({ err: err, message: "Por favor revise sus datos" });
    }
}

//eliminar usuario
obraController.delete = async function (req, res, next) {
    let { id } = req.params;
    await Obra.remove({ _id: id });
    res.status(200).json({ "message": "Usuario Eliminado con exito" });
}


module.exports = obraController;