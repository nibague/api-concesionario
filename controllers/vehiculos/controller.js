import { getDB } from '../../db/db.js';


 const queryAllVehiculos = async (callback) => {
    const conexion = getDB();
    await conexion.collection('vehiculo').find({}).limit(50).toArray(callback); 
    
 };

 export { queryAllVehiculos };