//MODULOS DE ROLES DE USUARIOS

const Sequelize = require("sequelize");

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
});


//DESCRIPCION DE LA TABLA DE ROLES  
const roles = sequelize.define('roles', {
  id: {type: Sequelize.SMALLINT, primaryKey: true},
  name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {notEmpty: true,}
  },
})



//FUNCIONES A EXPORTAR: obtener todos los roles, obtener por ID.
function obtenerTodosLosRoles() {
  return roles.findAll()
}

function obtenerPorId(idRole) {
  return roles.findOne({
      where: {
          id: idRole
      }
  }
  )
}

//EXPORTACION A APP.JS

module.exports =  {obtenerTodosLosRoles, obtenerPorId, roles};

