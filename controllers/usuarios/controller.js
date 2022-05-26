import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

 const queryAllUsuarios = async (callback) => {
    const conexion = getDB();
    await conexion.collection('Usuario').find({}).limit(50).toArray(callback); 
    
 };

 const consultarUsuario = async(id, callback) => {
    const conexion = getDB();
    await conexion.collection('Usuario').findOne({_id:new ObjectId(id)}, callback);
 }

 const crearUsuario  = async (datosUsuario, callback) => {
    const conexion = getDB();
    await conexion.collection('Usuario').insertOne(datosUsuario, callback);
 }

const editarUsuario = async (id, edicion, callback)=> {
    const filtroUsuario = {_id: new ObjectId(id)}
    const operacion = {
        $set:edicion,
    };
    const conexion = getDB();
    await conexion.collection('Usuario').findOneAndUpdate(filtroUsuario, operacion, {upsert:true, returnOriginal: true}, callback);

}

const eliminarUsuario = async (id, callback) => {
    const filtroUsuario = {_id: new ObjectId(id)} 
    const conexion = getDB();
    await conexion.collection('Usuario').deleteOne(filtroUsuario, callback);
}

 export { queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario};
