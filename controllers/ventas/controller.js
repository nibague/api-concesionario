import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

 const queryAllVentas = async (callback) => {
    const conexion = getDB();
    await conexion.collection('Venta').find({}).limit(50).toArray(callback); 
    
 };

 const consultarVenta = async(id, callback) => {
    const conexion = getDB();
    await conexion.collection('Venta').findOne({_id:new ObjectId(id)}, callback);
 }

 const crearVenta  = async (datosVenta, callback) => {
    const conexion = getDB();
    await conexion.collection('Venta').insertOne(datosVenta, callback);
 }

const editarVenta = async (id, edicion, callback)=> {
    const filtroVenta = {_id: new ObjectId(id)}
    const operacion = {
        $set:edicion,
    };
    const conexion = getDB();
    await conexion.collection('Venta').findOneAndUpdate(filtroVenta, operacion, {upsert:true, returnOriginal: true}, callback);

}

const eliminarVenta = async (id, callback) => {
    const filtroVenta = {_id: new ObjectId(id)} 
    const conexion = getDB();
    await conexion.collection('Venta').deleteOne(filtroVenta, callback);
}

 export { queryAllVentas, crearVenta, editarVenta, eliminarVenta, consultarVenta};
