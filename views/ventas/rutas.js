import Express from 'express';
import { getDB } from '../../db/db.js';
import { queryAllVentas, crearVenta, editarVenta, eliminarVenta, consultarVenta } from '../../controllers/Ventas/controller.js';

const rutasVenta= Express.Router();

const genericCallback = (res) => {
    return (err, result) => {

        if(err){
            res.sendStatus(500).send('error al consultar Ventas');
        }else{
            res.json(result);
        }
        
    };
};

rutasVenta.route('/Ventas').get((req, res)=>{
    console.log('sending request get in the route /Ventas');
    queryAllVentas(genericCallback(res));
});


rutasVenta.route('/Ventas').post((req, res)=>{
    crearVenta(req.body, genericCallback(res));
});

// ruta para consultar Ventas, filtrar informacion
rutasVenta.route('/Ventas/:id').get((req, res)=>{
    console.log('sending request get in the route /Ventas');
    consultarVenta(req.params.id, genericCallback(res));
});

rutasVenta.route('/Ventas/:id').patch((req, res)=>{
    editarVenta(req.params.id, req.body, genericCallback(res))

});

rutasVenta.route('/Ventas/:id').delete((req, res)=>{
    eliminarVenta(req.params.id, genericCallback(res))
});

export default rutasVenta;