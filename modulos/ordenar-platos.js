//MODULOS DE GESTION DE ORDENES DE PLATOS - TABLA INTERMEDIA
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
const ordenar_platos = sequelize.define('ordenar_platos', {
    id_order: {type: Sequelize.SMALLINT, foreignKey: true, primaryKey: true},
    id_dish: {type: Sequelize.SMALLINT, foreignKey: true, primaryKey: true},
    cant_dish: {type: Sequelize.SMALLINT},
    price_dish: {type: Sequelize.REAL},
  })


//FUNCIONES A EXPORTAR: 

  function obtenerOrdenPorId(idOrder) {
    return ordenar_platos.findOne({
        where: {
            id_order: idOrder
        }
    })
  }

  function agregarOrdenPorId(request, idOrder) {
    return ordenar_platos.create({
        id_order: idOrder,
        id_dish: request.id_dish,
        cant_dish: request.cant_dish,
        price_dish: request.price_dish,
    })
  }

  function borrarOrdenPorId(idOrder) {
    return ordenar_platos.destroy({
        where: {
            id_order: idOrder
        }
    }
    )
  }
  
  //EXPORTACION A APP.JS
  module.exports =  {obtenerOrdenPorId, agregarOrdenPorId, borrarOrdenPorId, ordenar_platos};
  