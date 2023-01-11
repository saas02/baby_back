const { response, request } = require('express');
const brcyptjs = require('bcryptjs');
const User = require("./../models/user");


const usersGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        /** Se coloca el await para esperar la salida de las dos query */
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.json({
        msg: " get API Controller",
        total,
        users
    })
}

const userGet = async (req = request, res = response) => {

    const { id } = req.params;
    
    try {
        if(id === "generic"){
            user = await User.findOne( { generic : true } );  
        }else{
            user = await User.findById( id );      
        }
    } catch (error) {
        user = [];
    }
    

    res.json({
        msg: " get API Controller",
        user
    })
}

const usersPost = async (req, res = response) => {

    const data = req.body;
    const user = new User(data);

    await user.save();

    res.json({
        msg: " post API Controller",
        user
    })

}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, ...data } = req.body;

    const usuario = await User.findByIdAndUpdate(id, data)

    res.json({
        msg: "put Update API Controller....",
        data,
        id
    })
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    const userAuthenticated = req.usuario;

    res.json({
        msg: " delete API Controller",
        user,
        userAuthenticated
    })
}

module.exports = {
    usersGet,
    userGet,
    usersPost,
    usersPut,
    usersDelete
}