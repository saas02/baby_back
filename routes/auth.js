const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { existeEmail } = require("../helpers/db-validators");

const { 
    login,
    createPost
} = require("../controllers/auth");



const router = Router();

router.post("/login", [
    check('email', 'El email es obligaorio').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], login );

router.post("/create", [
    check('name', 'El nombre debe ser obligaorio').notEmpty(),
    check('email', 'El email es obligaorio').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    check('email').custom( existeEmail ),
    validarCampos
], createPost );


module.exports = router;