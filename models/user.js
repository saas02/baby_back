const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    confirmation: {
        type: String
    },
    visits: {
        type: Number
    },
    gifts: {
        type: String
    },
    date: {
        type: Date,
        required: [true, 'El campo fecha es obligatorio..']
    },
    address: {
        type: String,
        required: [true, 'El campo direccion es obligatorio..']
    },
    latitude: {
        type: String,
        required: [true, 'El campo latitude es obligatorio..']
    },
    longitude: {
        type: String,
        required: [true, 'El campo longitud es obligatorio..']
    },
    video: {
        type: String,
        required: [true, 'El video es obligatorio..']
    },
    partners: {
        type: Object
    },
    
    
    
});

UserSchema.methods.toJSON = function(){
    /** Sirve para eliminar los campos del objeto */
    const { __v, _id, ...user } = this.toObject();
    user.id = (user.name === undefined) ? "generic" : _id;

    return user;
}


module.exports = model( 'User', UserSchema)