//realizar el import de express
//const express = require("express");

//nuevo import 
import Express from "express";

const app = Express();
app.use(Express.json());

app.get('/vehiculos', (req, res)=>{
    console.log('sending request get in the route /vehiculos');
    const vehiculos = [
        { nombre: 'corolla', marca: 'ferrari', modelo: '2011'},
        { nombre: 'fiesta', marca: 'chevrolet', modelo: '2017'},
        { nombre: 'tesla', marca: 'tesla', modelo: '2009'},
        { nombre: 'yaris', marca: 'ford', modelo: '2004'}
    ];
    res.send(vehiculos); 
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
             res.sendStatus(200);
         }else{
             res.sendStatus(500);
         }

    }catch {
        res.sendStatus(500);
    }
    
    //res.send('vehiculo was creted');

});

app.listen(5000, ()=>{
    console.log('listen port 5000')
});

