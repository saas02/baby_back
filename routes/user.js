const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJwt } = require('../middlewares');
const { existeUsuarioId } = require("../helpers/db-validators");

const { 
    userGet,
    usersGet, 
    usersPost, 
    usersPut,
    usersAllPatch, 
    usersDelete
} = require("../controllers/user");



const router = Router();

const usuariosPath = "/";

router.get(usuariosPath,  usersGet );

router.get(usuariosPath+":id", [    
    validarCampos    
], userGet );

/** El segundo parametro es un middleware que va a validar lo que necesitemos */
router.post(usuariosPath, [ 
    check('date', 'La fecha es obligatoria').not().isEmpty(),
    check('address', 'La address es obligatoria').not().isEmpty(),
    check('video', 'video es obligatorio').not().isEmpty(),
    check('latitude', 'La latitude es obligatoria').not().isEmpty(),
    check('longitude', 'La longitude es obligatoria').not().isEmpty(),
    validarCampos
] , usersPost );

router.patch(usuariosPath,  [
    validarJwt        
],usersAllPatch );

router.put(usuariosPath+":id",  [
    validarJwt,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),    
    validarCampos    
],usersPut );


router.delete(usuariosPath+":id",  [
    validarJwt,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
], usersDelete );


module.exports = router;