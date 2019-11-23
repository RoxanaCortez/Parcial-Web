//obtener todo
const Obra =require("./../models/Obra");

//insertar nuevas obras
const insert =(req, res)=>{
    const obra = new Obra(req.body);
    obra.save ((error, documents)=>{
        if(error)
            return res.status(500).json({
                msg:"hubo un error"
            });
        return res.status(201).json({
            msg: "creado",
            register:documents
        });
    });
};

//buscar por id
const getOneObra= (req,res)=>{
    Obra.findById(req.params.id, (error, documents)=>{
        if(error)
            return res.status(500).json({
                msg:"hubo un error"
            });
        return res.status(200).json({
            msg:"ok",
            registers:documents
        });
    });
}

//funcion de todos las obras guardados en la base
const getObra = (req,res)=>{
    Obra.find({}, (error, documents)=>{
        if(error)
            return res.status(500).json({
                msg:"hubo un error"
            });
        return res.status(200).json({
            msg:"ok",
            registers:documents
        });
    });
};

const update = (req, res)=>{
    let obra = req.body;

    if(!obra._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Obra.update({_id: obra._id}, obra)
        .then(value =>{
            res.status(200).json({
                message: "update register was successful"
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Something happend trying to update the Register"
            });
        })

}

const deleteById = (req, res)=>{
    let obra = req.body;

    if(!obra._id){
        return res.status(400).json({
            message: "id is needed",
        }); 
    }

    Obra.deleteOne({_id:obra._id})
        .then(deleted=>{
            res.status(200).json({
                message: "delete register was successful"
            });
        })
        .catch(err=>{
            res.status(500).json({
                message: "Something happend trying to delete the Register"
            });
        })
}

module.exports={
    insert,
    getOneObra,
    getObra,
    update,
    deleteById
};