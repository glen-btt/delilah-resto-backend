//MODULOS DE GESTION DE ORDENES-PEDIDOS
const Sequelize = require("sequelize");

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


//DESCRIPCION DE LA TABLA
const ordenes = sequelize.define('ordenes', {
  id: {type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true},
  id_user: {type: Sequelize.SMALLINT, foreignKey: true},
  date: {type: Sequelize.DATE},
  payment: {type: Sequelize.STRING},
  status: {type: Sequelize.STRING},    
  price: {type: Sequelize.REAL},
  address_user: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true,}
  },
  phone_user: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true,}
},
  comments: {type: Sequelize.STRING}
})



//FUNCIONES A EXPORTAR: 

function obtenerTodasLasOrdenes() {
  return ordenes.findAll()
}

function obtenerOrdenes(request) {
  return ordenes.findOne({
      where: {
          id: request.params.id
      }
  })  
}

function agregarOrden(request) {
  return ordenes.create({
      id_user: request.body.id_user,
      date: request.body.date,
      payment: request.body.payment,
      status: request.body.status,
      price: request.body.price,
      adress_user: request.body.adress_user,
      phone_user: request.body.phone_user,
      comments: request.body.comments,
  })
}

function actualizarOrden(request) {
  return ordenes.update({
      status: request.body.status},
  {
      where: {id: request.body.id}
  })
}

function borrarOrden(request) {
  return ordenes.destroy({
    where: {
        id: request.body.id
    }
})
}

//EXPORTACION A APP.JS

module.exports =  {obtenerTodasLasOrdenes, obtenerOrdenes, agregarOrden, borrarOrden, actualizarOrden, ordenes};
