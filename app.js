// CREACION DE VARIABLES
//Aquí llamamos y creamos las variables para los modulos de NODE

const express = require ("express"); //basico para crear la restapi
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken'); //para proteger las rutas del proyecto
const server = express(); //crea una variable para express llamada server



//server.listen(3000,()=>{
//    console.log("Servidor iniciado!");
//});




//BodyParser - Función codificar la URL
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true})); 


//Sección roles + token para los usuarios admin (usar jsonwebtoken)
const usuarios = require("./modulos/usuarios.js");

server.post('/api/usarios/add', function (request, response) {

    return usuarios.agregarUsuario(request)
    .then(function (usuarios) {
        if (usuarios) {
            response.send(usuarios);
        } else {
            response.status(400).send('Error 400 agregando un nuevo usuario');
        }
    })
    .catch(err=>response.status(400).send(err.parent.sqlMessage));        
});

server.post('/api/autenticar', (request, response) => {
    return usuarios.obtenerPorNickname(request.body.user)
    .then(function (usuarios) {
        if (usuarios){
            if (usuarios.toJSON().password==request.body.password){
                const payload = {
                check:  true
                };
                const token = jwt.sign(payload, app.get('llave'), {
                expiresIn: 1440
                });
                response.json({
                mensaje: 'Autenticación correcta',
                token: token
                });
            } else {
                response.json({ mensaje: "Contraseña incorrecta"})
            }
        }else{
            response.json({ mensaje: "Usuario inexistente"})
        }
    })
})

const rutasProtegidas = express.Router();

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });



//ENDPOINT ROLES
const roles = require("./modulos/roles.js");

server.get('/api/modulos/roles/obtenerTodos', rutasProtegidas, (request, response) => {
    return roles.obtenerTodosLosRoles()
    .then(function (roles) {
        if (roles) {
            response.send(roles);
            
        } else {
            response.status(400).send('Error');
        }
    });
})

server.get('/api/modulos/roles/obtenerPorId/:id', rutasProtegidas, (request, response)=>{
    return roles.obtenerPorId(request.params.id)
    .then(function (roles) {
        if (roles) {
            response.send(roles);
        } else {
            response.status(400).send('Error');
        }
    });
})


//ENDPOINT DE USUARIOS

server.put('/api/usuarios/update/:nickName', rutasProtegidas, function (request, response) {

    if (request.body.requestedBy == request.params.nickName){
        return usuarios.updateUser(request)
        .then(function (usuarios) {
            if (usuarios) {
                response.status(200).send('El usuario ' + request.params.nickName + ' ha sido actualizado con éxito')
            } else {
                response.status(400).send('Error actualizando el usuario');
            }
        })    
        .catch(err=>response.status(400).send(err.parent.sqlMessage)); 
        }else{
            response.status(400).send('No tiene permisos para actualizar el ususario');
        }
});


server.get('/api/usuarios/getByNickName', rutasProtegidas, (request, response)=>{
if (request.body.requestedBy == request.body.nickName){
    return usuarios.getByNickName(request.body.nickName)
    .then(function (usuarios) {
        if (users) {
            response.send(usuarios);
        } else {
            response.status(400).send('No existe el Nickname ingresado');
        }
    });
}else{
    response.status(400).send('No tiene permisos para consultar el ususario');
}
})


//ENDPOINT DE PLATOS
const platos = require("./modulos/platos.js");

server.get('/api/modulos/platos/obtenerPlatos', (request, response) => {
    return platos.obtenerPlatos()
    .then(function (platos) {
        if (platos) {
            response.send(platos);
            
        } else {
            response.status(400).send('Error');
        }
    });
})







//ENDPOINT DE ORDENES
const ordenes = require("./modulos/ordenes.js");
const ordenar_platos = require("./modulos/ordenar_platos.js"); //tabla intermedia de cantidades

//ojo con esta seccion revisar!!
server.post('/api/order/add', rutasProtegidas, function (request, response) {
    return ordenes.addOrder(request)
    .then(function (orders) {
        if (ordenes) {
            request.body.platos.forEach(element => {
                return platos.obtenerPorId(element.id_dish)  
                .then(function(platos){
                    if (platos){                                 
                        return ordenar_platos.agregarOrdenPorId(element, ordnes.toJSON().id)
                        .then(function(ordenar_platos){
                            response.send(ordenes);
                        })                                                          
                    }else{
                        response.status(400).send('No existe un plato con ese id' + element.id_dish);
                    }
                    
                });   
            });
        
        } else {
            response.status(400).send('Error agregando un nuevo plato. Vuelva a intentarlo');
        }
    })
    .catch(err=>response.status(400).send(err.parent.sqlMessage));      
        
});

server.put('/api/order/update', rutasProtegidas, function (request, response) {
    return usuarios.obtenerPorNickName(request.body.requestedBy)
    .then(function (usuarios) {
        if (usuarios){
            if (usuarios.toJSON().role==1){
                return ordenes.actualizarOrden(request)
                .then(function (ordenes) {
                    if (ordenes) {
                        response.status(200).send('La orden ' + request.body.id + ' ha sido actualizada con éxito')
                    } else {
                        response.status(400).send('Error actualizando la orden');
                    }
                })   
                .catch(err=>response.status(400).send(err.parent.sqlMessage));  
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});


server.delete('/api/order/delete', rutasProtegidas, function (request, response) {
    return usuarios.obtenerPorNickname(request.body.requestedBy)
    .then(function (usuarios) {
        if (usuarios){
            if (usuarios.toJSON().role==1){
                return ordenar_platos.borrarOrdenPorId(request.body.id)
                .then(function(ordenar_platos){
                    return ordenes.borrarOrden(request)
                    .then(function (ordenes) {
                        if (ordenes) {
                            response.status(200).send('La orden ' + request.body.id + ' ha sido eliminada con éxito')
                        } else {
                            response.status(400).send('No existe una orden con ese id');
                        }
                    })        
                    });  
                }else{
                    response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
                }
            }else{
                response.status(400).send('No existe el usuario ' + request.body.requestedBy);
            }
        });       
            
    });


server.get('/api/order/getAll', rutasProtegidas, (request, response) => {
    return usuarios.obtenerPorNickname(request.body.requestedBy)
    .then(function (usuarios) {
        if (usuarios){
            if (usuarios.toJSON().role==1){
                return ordenes.obtenerTodasLasOrdenes()
                .then(function (ordenes) {
                    if (ordenes) {
                        response.send(ordenes);
                        
                    } else {
                        response.status(400).send('Error realizando la consulta de las ordenes 1');
                    }
                })   
                .catch(err=>response.status(400).send(err.parent.sqlMessage));  
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});

server.get('/api/order/getById/:id', rutasProtegidas, (request, response)=>{
    return usuarios.obtenerPorNickname(request.body.requestedBy)
    .then(function (usuarios) {
        if (usuarios){
            if (usuarios.toJSON().role==1){
                return ordenes.obtenerPorId(request)
                .then(function (ordenes) {
                    if (ordenes) {
                        response.send(ordenes);
                    } else {
                        response.status(400).send('Error realizando la consulta 2');
                    }
                })   
                .catch(err=>response.status(400).send(err.parent.sqlMessage));  
            }else{
                response.status(400).send('El usuario ' + request.body.requestedBy + ' no posee rol de administrador');
            }
        }else{
            response.status(400).send('No existe el usuario ' + request.body.requestedBy);
        }
    });       
        
});



//Principal Endpoint
server.get("/",(req,res)=>{
    res.send("Bienvenido a Delilah Delivery");
});