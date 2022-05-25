import { getDB } from '../../db/db.js';


 const queryAllVehiculos = async (callback) => {
    const conexion = getDB();
    await conexion.collection('vehiculo').find({}).limit(50).toArray(callback); 
    
 };

 const crearVehiculo  = async (datosVehiculo, callback) => {

    
    if(
        Object.keys(datosVehiculo).includes('name')
        && Object.keys(datosVehiculo).includes('brand')
        && Object.keys(datosVehiculo).includes('model')
    ) {

        const conexion = getDB();
            //implementar codigo para crear vehiculo en la base de datos
        conexion.collection('vehiculo').insertOne(datosVehiculo, callback);
        }else{
            return 'error';
        }
 }

 export { queryAllVehiculos, crearVehiculo };
