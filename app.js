const express = require ("express"); //llamamos a express del package json
const server = express();

server.listen(3000,()=>{
    console.log("Servidor iniciado!");
});