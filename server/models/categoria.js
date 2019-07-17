const mongosee = require('mongoose');
const Schema = mongosee.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripción es requerida']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})
module.exports = mongosee.model('Categoria', categoriaSchema);