//realizar el import de express
//const express = require("express");

//nuevo import 
import Express from "express";
import { MongoClient, ObjectId} from 'mongodb';
import Cors from 'cors';

const stringConexion = 'mongodb+srv://Nibague:uribeparaco82@clustertest.tebmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(stringConexion,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexion;

const app = Express();
app.use(Cors());

app.use(Express.json());

app.get('/vehiculos', (req, res)=>{
    console.log('sending request get in the route /vehiculos');
    //codigo que permite traer los vehiculos de la base de datos
    //para evitar probar con datos quemados:
    /*const vehiculos = [
        { nombre: 'corolla', marca: 'ferrari', modelo: '2011'},
        { nombre: 'fiesta', marca: 'chevrolet', modelo: '2017'},
        { nombre: 'tesla', marca: 'tesla', modelo: '2009'},
        { nombre: 'yaris', marca: 'ford', modelo: '2004'}
    ];*/
    conexion.collection('vehiculo').find({}).limit(50).toArray((err, result)=>{
        if(err){
            res.sendStatus(500).send('error al consultar vehiculos');
        }else{
            res.json(result);
        }
    }); 
});

// solicitudes de tipo post no se pueden probar en el navegador
// estas solicitudes son las que se envian desde el front-end
// se podria probar desde un formulario con un boton y desde alli enviar las solicitudes
app.post('/vehiculos/nuevo', (req, res)=>{
    const datosVehiculo = req.body;
    
    console.log('keys: ', Object.keys(datosVehiculo));
    try {
        if(Object.keys(datosVehiculo).includes('name')
        && Object.keys(datosVehiculo).includes('brand')
        && Object.keys(datosVehiculo).includes('model'))
        {
             //implementar codigo para crear vehiculo en la base de datos
             conexion.collection('vehiculo').insertOne(datosVehiculo, (err, result)=>{
                 if(err){
                     console.error(err)
                     res.sendStatus(500);
                 }else{
                     console.log(result)
                     res.sendStatus(200);
                 }

             });
         }else{
             res.sendStatus(500);
         }

    }catch {
        res.sendStatus(500);
    }
    
    //res.send('vehiculo was creted');

});

app.patch('/vehiculos/editar', (req, res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtroVehiculo = {_id: new ObjectId(edicion.id)}
    delete edicion.id
    const operacion = {
        $set:edicion,
    };
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

app.delete('/vehiculos/eliminar', (req, res)=>{
    const edicion = req.body
    const filtroVehiculo = {_id: new ObjectId(edicion.id)} 
    conexion.collection('vehiculo').deleteOne(filtroVehiculo, (err, result) =>{
        if(err){
            console.error(err);
            res.sendStatus(500)
        }else{
            res.sendStatus(200);
        }
    })
})

const main = ()=> {
    client.connect((err, db)=>{
        if(err){
            console.erro('Error conectando a la base de datos');
            return 'error';
        }
        conexion = db.db('concesionario');
        console.log('succesful conection!')
        return app.listen(5000, ()=>{
            console.log('listen port 5000');
        });
    });
    
};

main();
