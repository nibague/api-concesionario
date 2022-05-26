//realizar el import de express
//const express = require("express");

//nuevo import 
import Express from "express";
import dotenv from 'dotenv';
import Cors from 'cors';
import { conectarBD, getDB } from './db/db.js';
import rutasVehiculo from './views/vehiculos/rutas.js'
import rutasUsuario from "./views/usuarios/rutas.js";
import rutasVenta from "./views/ventas/rutas.js"


dotenv.config({path:'./.env'})

const app = Express();

app.use(Cors());
app.use(Express.json());

app.use(rutasVehiculo);
app.use(rutasUsuario);
app.use(rutasVenta);


const main = ()=> {
    app.listen(process.env.PORT, ()=>{
        console.log(`listen port ${process.env.PORT}`);
    });
};

conectarBD(main);
