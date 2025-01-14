
/*ejemplo de uso para cada uno de los métodos
GET nos devuelve todos los registros. Read: Leer registros de la base de datos.
GET/ID (pasándole un id) nos devuelve registro en particular
POST creamos nuevo registros. Create: Agregar nuevos registros a la base de datos.
PUT actualización de datos. Update: Modificar registros existentes en la base de datos
DELETE eliminamos registro. Delete: Borrar registros de la base de datos.
*/

/*
Postman:
es como un laboratorio de pruebas para APIs. Te permite enviar solicitudes HTTP a diferentes endpoints y observar las respuestas.
Supongamos que deseas obtener el pronóstico del tiempo de una ciudad. Con Postman, puedes configurar una solicitud GET a 
una API de pronóstico del tiempo,ver la respuesta en formato JSON y asegurarte de que los datos sean precisos.
GET https://api.weather.com/forecast?city=NewYork

cURL: 
cURL es una herramienta de línea de comandos que te permite realizar solicitudes HTTP directamente desde tu terminal. 
Puedes obtener el mismo pronóstico del tiempo utilizando cURL de esta manera:
curl https://api.weather.com/forecast?city=NewYork

Ambas herramientas son poderosas, pero Postman es amigable para aquellos que prefieren una interfaz gráfica, 
mientras que cURL es perfecto para usuarios de la línea de comandos.

*/

/***PISTAS**

- Cuando creamos rutas dinámicas para acceder a cada uno de los usuarios lo hacemos con 'comodines', añadimos con algo parecido a
   `:nombre`, `:id`, ... esos cómodines en las URL se cambiaría por el nombre o el id de usuario para poder acceder a él. 
- Con `req.params` accederás al objeto que devuelve el parametro añadido. Si añades el 'comodín' en tu código verás el string   
- Para acceder al nombre de los usuarios puedes usar el método `find()` para encontrar el usuario
- Para poder probar el "post" sin hacer un form que envie datos necesitarás instalar la extensión de visual studio code 
  "REST Client". Si has usado alguna otra como "Thunder Client" o "Postman", podrás usarlas. Veremos en clase como funciona,
   pero por si eres curioso y no puedes esperar.*/


//1. **Instalar Dependencias:** npm install -E (OK)
const express=require("express");
const app= express();   

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//cliente, body de la petición

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


///////////////////////////GET/usuarios`: Obtiene la lista de todos los usuarios.//////////////////////////////
app.get("/usuarios", (req, res)=>{//accedemos a usuarios para que nos devuelva todo el json
    res.json(usuarios);
    console.log(req.params)
});

///////////////////////////POST/usuarios: Crea un nuevo usuario.//////////////////////////////
/*tengo que ir a postman Body/Raw y escribo por ejemplo, en este caso: {"nombre":"Mateo","edad":"8","lugarProcedencia":"Asturias"}*/
app.post("/usuarios", (req, res)=>{
    console.log(req)
    const nuevoUsuario={
        id:usuarios.length +1, //cuéntame los usuarios que hay y súmale uno más
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,     
    };
    
    usuarios.push(nuevoUsuario)//añadimos este elemento
    res.redirect("/usuarios");//repsuesta una vez que demos a "agregar usuario"
})

///////////////////////////GET/usuarios/:nombre Obtiene un usuario por nombre//////////////////////////////
app.get("/usuarios/:nombre", (req, res)=>{//accedemos a usuarios para que nos devuelva un json
   // res.json(usuarios[0]);//req.params.nombre es lo que pongamos en la url en la parte
   const buscarUsuario= usuarios.findIndex((usuario, i) => usuario.nombre== req.params.nombre);
   res.send(usuarios[buscarUsuario])
});
/*otra opción
app.get('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const usuario = usuarios.find(user => user.nombre.toLowerCase() === nombre.toLowerCase());
    if (!usuario) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(usuario);
});*/


/*3. **Realizar Operaciones CRUD:**
   - Utiliza herramientas como Postman o cURL para realizar operaciones CRUD en la API.
   - Ejemplo: Para acceder al usuario Ryu, realiza una solicitud `GET` a `http://localhost:3000/usuarios/Ryu`.*/

//para ello descargamos POSTMAN (OK)


/*BONUS 
Crea dos rutas nuevas para terminar tu CRUD completo
   - `PUT /usuarios/:nombre`: Actualiza la información de un usuario por nombre.
   - `DELETE /usuarios/:nombre`: Elimina un usuario por nombre.
Son similares a "POST". Con "PUT" piensa como usar el método `findIndex()` y con el "DELETE" el método `filter()`.*/

//////////////////PUT /usuarios/:nombre: Actualiza la información de un usuario por nombre//////////////////
app.put("/usuarios/:nombre", (req, res)=>{
    console.log(req)//vemos lo que hay en req
    const modificarUsuario= usuarios.findIndex((usuario, i) => usuario.nombre== req.params.nombre);
    const usuarioModificado=req.body //lo dejo así porque no sabemos qué vamos a cambiar (nombre, lugar procedenia etc)
    usuarios[modificarUsuario].nombre=usuarioModificado.nombre?usuarioModificado.nombre:usuarios[modificarUsuario].nombre
    usuarios[modificarUsuario].edad=usuarioModificado.edad?usuarioModificado.edad:usuarios[modificarUsuario].edad
    usuarios[modificarUsuario].lugarProcedencia=usuarioModificado.lugarProcedencia?usuarioModificado.lugarProcedencia:usuarios[modificarUsuario].lugarProcedencia

    res.send(usuarios[modificarUsuario])
});//tengo que ir a postman Body/Raw y escribo por ejemplo, en este caso:{"nombre":"Mariana"}

//params: es lo que está en la url. Por ejemplo :nombre
//query: es lo mismo que params pero una escala menor, está en la url. se define por ? y luego &
//body: es la info que se envía dentro de la petición, no está en la url

///////////////////////////DELETE /usuarios/:nombre: Elimina un usuario por nombre////////////////////////////
app.delete("/usuarios/:nombre", (req, res)=>{
    console.log(req)
    const eliminarUsuario = usuarios.filter((usuario, i) => usuario.nombre== req.params.nombre);//req.params.nombre equivale a lo que pongamos en :nombre en la url
    console.log("el objeto a eliminar es", eliminarUsuario)
    res.send("usuario eliminado con éxito")//PTE ACABAR PARA GENERAR UN NUEVO ARRAY PERO SIN EL ELIMINADO
})


app.listen(3000,() =>{
    console.log("Express está escuchando en el puerto 3000")
})
  

  /***PISTAS**

- Cuando creamos rutas dinámicas para acceder a cada uno de los usuarios lo hacemos con 'comodines', añadimos con algo parecido a `:nombre`, 
  `:id`, ... esos cómodines en las URL se cambiaría por el nombre o el id de usuario para poder acceder a él. 
- Con `req.params` accederás al objeto que devuelve el parametro añadido. Si añades el 'comodín' en tu código verás el string   
- Para acceder al nombre de los usuarios puedes usar el método `find()` para encontrar el usuario
- Para poder probar el "post" sin hacer un form que envie datos necesitarás instalar la extensión de visual studio code 
  "REST Client". Si has usado alguna otra como "Thunder Client" o "Postman", podrás usarlas. Veremos en clase como funciona, 
  pero por si eres curioso y no puedes esperar.*/


