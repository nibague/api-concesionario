import Express from 'express';
import { getDB } from '../../db/db.js';
import { queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario } from '../../controllers/Usuarios/controller.js';

const rutasUsuario= Express.Router();

const genericCallback = (res) => {
    return (err, result) => {

        if(err){
            res.sendStatus(500).send('error al consultar Usuarios');
        }else{
            res.json(result);
        }
        
    };
};

rutasUsuario.route('/usuarios').get((req, res)=>{
    console.log('sending request get in the route /Usuarios');
    queryAllUsuarios(genericCallback(res));
});


rutasUsuario.route('/usuarios').post((req, res)=>{
    crearUsuario(req.body, genericCallback(res));
});

// ruta para consultar Usuarios, filtrar informacion
rutasUsuario.route('/usuarios/:id').get((req, res)=>{
    console.log('sending request get in the route /Usuarios');
    consultarUsuario(req.params.id, genericCallback(res));
});

rutasUsuario.route('/usuarios/:id').patch((req, res)=>{
    editarUsuario(req.params.id, req.body, genericCallback(res))

});

rutasUsuario.route('/usuarios/:id').delete((req, res)=>{
    eliminarUsuario(req.params.id, genericCallback(res))
});

export default rutasUsuario;