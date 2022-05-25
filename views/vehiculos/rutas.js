import Express from 'express';
import { getDB } from '../../db/db.js';
import { queryAllVehiculos, crearVehiculo } from '../../controllers/vehiculos/controller.js';

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
rutasVehiculo.route('/vehiculos/nuevo').post((req, res)=>{
    crearVehiculo(req.body, genericCallback(res));
});


rutasVehiculo.route('/vehiculos/editar').patch((req, res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtroVehiculo = {_id: new ObjectId(edicion.id)}
    delete edicion.id
    const operacion = {
        $set:edicion,
    };
    const conexion = getDB();
    conexion.collection('vehiculo').findOneAndUpdate(filtroVehiculo, operacion, {upsert:true, returnOriginal: true}, (err, result)=>{
        if(err){
            console.error('error actualizando vehiculo', err);
            res.sendStatus(500);
        }else{
            console.log('actualizado con exito');
            res.sendStatus(200);
        }
    });

});

rutasVehiculo.route('/vehiculos/eliminar').delete((req, res)=>{
    const edicion = req.body
    const filtroVehiculo = {_id: new ObjectId(edicion.id)} 
    const conexion = getDB();
    conexion.collection('vehiculo').deleteOne(filtroVehiculo, (err, result) =>{
        if(err){
            console.error(err);
            res.sendStatus(500)
        }else{
            res.sendStatus(200);
        }
    })
});

export default rutasVehiculo;