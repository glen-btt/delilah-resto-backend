# Delilah Resto Backend
Backend creado para la aplicación de delivery Delilah Resto.
- Funcionalidades: creación de usuarios, gestion de pedidos, generación de pedidos, actualización de ordenes, listado de platos. 
- Codigo: NodeJs, SQL, Swagger, Javascript.

- Este Readme fue creado para explicar la instalación del mismo:

#### ¿Cómo instalar la base de datos? - Pasos a seguir
- Descargar los archivos dentro de la carpeta Database de este repositorio
- Instalar PHP My admin utilizando Xammp e importar dicha carpeta para tener la estructura en la propia PC.

Detalle de la estructura de tablas:
![relacion entre tablas 2](https://user-images.githubusercontent.com/58470524/94385189-df2d5680-011a-11eb-95eb-13b21a7c0d1d.PNG)

#### ¿Cómo configurar el servidor? - Pasos a seguir
- Instalar NodeJS ingresando a https://nodejs.org/es/download/ eligiendo la versión acorde a nuestro dispositivo.
- Descargamos este repositorio completo
- Ingresamos a Visual Studio (o cualquier editor de código deseado), importamos la carpeta que descargamos y ejecutamos npm start en la terminal.
- Instalamos POSTMAN para probar los endpoints en https://www.postman.com/


##### Recordar que es necesario ingresar el "access-token" en el header para acceder a todos los métodos (excepto para agregar usuarios en api/usuarios/add )

![Captura](https://user-images.githubusercontent.com/58470524/94385181-d89edf00-011a-11eb-98b1-c502295b0c7b.PNG)

Se puede obtener un detalle de los endpoint ingresando a la documentación del proyecto.
