const mongoose = require('mongoose');

function generarNumSerie() {
    return Math.floor(Math.random() * 10**17).toString().padStart(17, '0');
}

const RecursoSchema = mongoose.Schema({
    idEmpresa: {
        type: String,
        required: true
    },
    numSerie: {
        type: String,
        default: generarNumSerie,
    },
    idRecurso:{
        type: String,
        required: true
    },
    recurso: {
        type: String,
    },
    marca: {
        type: String,
    },
    gama: {
        type: String,
    },
    estatus: {
        type: String,
        required: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    estado:{
        type: String,
        enum: ['En almacén', 'Asignado'],
        default: 'En almacén'
    }
});

module.exports = mongoose.model('Recurso', RecursoSchema);
