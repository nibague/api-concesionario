import Express from 'express';
import { getDB } from '../../db/db.js';
import { queryAllVehiculos, crearVehiculo, editarVehiculo, eliminarVehiculo } from '../../controllers/vehiculos/controller.js';

const rutasVehiculo= Express.Router();

const genericCallback = (res) => {
    return (err, result) => {

        if(err){
            res.sendStatus(500).send('error al consultar vehiculos');
        }else{
            res.json(result);
        }
        
    };
};



rutasVehiculo.route('/vehiculos').get((req, res)=>{
    console.log('sending request get in the route /vehiculos');
    queryAllVehiculos(genericCallback(res));
});


// solicitudes de tipo post no se pueden probar en el navegador
// estas solicitudes son las que se envian desde el front-end
// se podria probar desde un formulario con un boton y desde alli enviar las solicitudes
rutasVehiculo.route('/vehiculos').post((req, res)=>{
    crearVehiculo(req.body, genericCallback(res));
});


rutasVehiculo.route('/vehiculos/:id').patch((req, res)=>{
    editarVehiculo(req.params.id, req.body, genericCallback(res))

});

rutasVehiculo.route('/vehiculos/:id').delete((req, res)=>{
    eliminarVehiculo(req.params.id, genericCallback(res))
});

export default rutasVehiculo;