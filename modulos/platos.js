//MODULOS DE GESTION DE LOS PLATOS DISPONIBLES
const Sequelize = require("Sequelize");

const sequelize = new Sequelize("delilah-acamica","root","",{
    host:"localhost",
    dialect: "mysql",
}) //nombre de base, username, password (que luego hay que esconder)


//AUTENTICATE
sequelize.authenticate()
.then(() => {
  console.log('OK! Conectado a la base de datos')
})
.catch(err => {
  console.log('Error: No se conecto a la base de datos')
})


//FUNCIONES A EXPORTAR: obtener todos los platos, obtener por ID, actualizar, borrar, agregar







module.exports =  {getAllOrders, getById, addOrder, deleteOrder, updateOrder, orders};
  

