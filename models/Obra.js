const Mongoose = require("mongoose");

const ObraSchema = Mongoose.Schema({
    nombre:{type: String, required: true},
    fecha:{type: String, required: true},
    tipo:{type: String, required: true},
    invaluable:{type: String, required: true}
});

module.exports=Mongoose.model('obra', ObraSchema);