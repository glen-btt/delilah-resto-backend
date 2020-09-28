// // MODULOS DE GESTION DE LOS PLATOS DISPONIBLES // //
const Sequelize = require("sequelize");

const sequelize = new Sequelize("delilah-acamica","desarrollo","desarrollo",{
    host:'localhost',
    dialect: 'mysql',
}); //nombre de base, username, password (que luego hay que esconder)


//AUTENTICATE
sequelize.authenticate()
.then(() => {
  console.log('OK! Conectado a la base de datos')
})
.catch(err => {
  console.log('Error: No se conecto a la base de datos')
});


//DESCRIPCION DE LA TABLA

const platos = sequelize.define("platos", {
  id:{
    type:Sequelize.SMALLINT,  
    primaryKey:true},
  name:{
    type: Sequelize.STRING,
    AllowNull: false,
    unique: true,
    validate: {notEmpty:true,}
  },
  category: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  price: {type: Sequelize.REAL},
  requestedBy: {
    type: Sequelize.STRING,
    allowNull: false,
  validate: {notEmpty:true,}
},
})

//FUNCIONES A EXPORTAR: obtener todos los platos, obtener por ID, actualizar, borrar, agregar

function obtenerPlatos(){
  return platos.findAll()
}

function obtenerPorId(idDish) {
  return platos.findOne({
      where: {id: idDish }
  })
}

function agregarPlato(request) {
  return platos.create({
      name: request.body.name,
      category: request.body.category,
      description: request.body.description,
      price: request.body.price,
      requestedBy: request.body.requestedBy,
  })
}

function actualizarPlato(request) {
  return platos.update({
    name: request.body.name,
    category: request.body.category,
    description: request.body.description,
    price: request.body.price,
    requestedBy: request.body.requestedBy},
    
  {
      where: {id: request.params.id}
  }
  )
}

function borrarPlato(request) {
  return platos.destroy({
      where: {id: request.params.id}
  })
}

//EXPORTACION A APP.JS

module.exports =  {obtenerPlatos,obtenerPorId,agregarPlato,actualizarPlato,borrarPlato, platos}; 
