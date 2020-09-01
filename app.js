const express = require ("express"); //llamamos a express del package json, para crear el servidor y realizar llamadas HTTP.
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken'); //para proteger las rutas del proyecto
const server = express(); //crea una variable para express llamada server

server.listen(3000,()=>{
    console.log("Servidor iniciado!");
});

//server.use(bodyParser.json());
//applicationCache.use(bodyParser.urlencoded({extended:true})); //codificar la URL

server.get("/",(req,res)=>{
    res.send("Hola mundo");
});



//Endpoint Platos
server.get("/dishes",(req,res)=>{
    res.send("Hola sección de platos");
});



//Endpoint Usuarios



//Endpoint Ordenes

