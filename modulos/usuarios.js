//MODULOS DE GESTION DE USUARIOS
const Sequelize = require("sequelize");

const sequelize = new Sequelize("delilah-acamica","root","",{
    host:"localhost",
    dialect: "mysql",
}); //nombre de base, username, password (que luego hay que esconder)


//AUTENTICATE
sequelize.authenticate()
.then(() => {
  console.log('OK! Conectado a la base de datos')
})
.catch(err => {
  console.log('Error: No se conecto a la base de datos')
});


//DESCRIPCION DE LA TABLA (revisar si esta todo ok en php)
const usuarios = sequelize.define('usuarios', {
  id: {type: Sequelize.SMALLINT, primaryKey: true},
  nick_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {notEmpty: true,}
  },
  name: Sequelize.STRING, 
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  address: Sequelize.STRING,
  password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {notEmpty: true,}
  },
  role: Sequelize.SMALLINT,
})

//FUNCIONES A EXPORTAR: 

function agregarUsuario(request) {
  return usuarios.create({
      nick_name: request.body.nickName,
      name: request.body.name,
      last_name: request.body.lastName,
      email: request.body.email,
      phone: request.body.phone,
      address: request.body.address,
      password: request.body.password,
      role: request.body.role
  })
}

function actualizarUsuario(request) {
  return usuarios.update({
      name: request.body.name,
      last_name: request.body.lastName,
      email: request.body.email,
      phone: request.body.phone,
      address: request.body.address,
      password: request.body.password,
      role: request.body.role},
  {
      where: {
          nick_name: request.params.nickName
      }
  }
  )
}

function borrarUsuario(request) {
  return usuarios.destroy({
      where: {
          id: request.params.id
      }
  }
  )
}

function obtenerTodosLosUsuarios() {
  return usuarios.findAll()
}

function obtenerPorId(request) {
  return usuarios.findOne({
      where: {
        id: request.params.id
      }
  })
}

function obtenerPorNickname(nickName) {
  return usuarios.findOne({
      where: {
          nick_name: nickName
      }
  })
}


//EXPORTACION A APP.JS
module.exports =  {agregarUsuario, actualizarUsuario, borrarUsuario, obtenerTodosLosUsuarios, obtenerPorId, obtenerPorNickname, usuarios};
