import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
import { ObjectID } from 'bson';

 const queryAllVehiculos = async (callback) => {
    const conexion = getDB();
    await conexion.collection('vehiculo').find({}).limit(50).toArray(callback); 
    
 };

 const consultarVehiculo = async(id, callback) => {
    const conexion = getDB();
    await conexion.collection('vehiculo').findOne({_id:new ObjectID(id)}, callback);
 }

 const crearVehiculo  = async (datosVehiculo, callback) => {

    if(
        Object.keys(datosVehiculo).includes('name')
        && Object.keys(datosVehiculo).includes('brand')
        && Object.keys(datosVehiculo).includes('model')
    ) {

        const conexion = getDB();
            //implementar codigo para crear vehiculo en la base de datos
        await conexion.collection('vehiculo').insertOne(datosVehiculo, callback);
        }else{
            return 'error';
        }
 }

const editarVehiculo = async (id, edicion, callback)=> {
    const filtroVehiculo = {_id: new ObjectId(id)}
    const operacion = {
        $set:edicion,
    };
    const conexion = getDB();
    await conexion.collection('vehiculo').findOneAndUpdate(filtroVehiculo, operacion, {upsert:true, returnOriginal: true}, callback);

}

const eliminarVehiculo = async (id, callback) => {
    const filtroVehiculo = {_id: new ObjectId(id)} 
    const conexion = getDB();
    await conexion.collection('vehiculo').deleteOne(filtroVehiculo, callback);
}

 export { queryAllVehiculos, crearVehiculo, editarVehiculo, eliminarVehiculo, consultarVehiculo};
