const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    destiny: {
        type: String,
        required: [true, 'Este es un campo requerido'],
        maxLength: [150, 'No debe excer los 150 caracteres']
    },
    date_travel_iso: {
        type: Date,
        required: [true, 'Este es un campo requerido'],
    },
    group_travel: {
        type: String,
        required: [true, 'Este es un campo requerido'],
    },   
    travel_state: {
        type: String,
        required: [true, 'Este es un campo requerido'],
    },   

    isSold: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
);
// Establecemos un campo virtual
TravelSchema.virtual('date_travel')
    .set(function(fecha) {
        // El formato esperado es 'yyyy-mm-dd' que es el devuelto por el campo input
        // el valor recibido se almacenará en el campo date_travel de nuestro documento
        this.date_travel_iso = new Date(fecha);
    })
    .get(function(){
        // el valor devuelto será un string en formato 'yyyy-mm-dd'
        return this.date_travel_iso.toISOString().substring(0,10);
    });

const Travel = mongoose.model('Travel', TravelSchema);

module.exports = Travel;