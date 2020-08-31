//MODULOS DE ROLES DE USUARIOS

const Sequelize = require("Sequelize");

const sequelize = new Sequelize("delilah-acamica","root","",{
    host:"localhost",
    dialect: "mysql",
}) //contiene 1-nombre de base, 2-username, 3-password 


//AUTENTICATE
sequelize.authenticate()
.then(() => {
  console.log('OK! Conectado a la base de datos')
})
.catch(err => {
  console.log('Error: No se conecto a la base de datos')
})

//DESCRIPCION DE LA TABLA



//FUNCIONES A EXPORTAR: obtener todos los platos, obtener por ID, actualizar, borrar, agregar







module.exports =  {getAllOrders, getById, addOrder, deleteOrder, updateOrder, orders};
  

