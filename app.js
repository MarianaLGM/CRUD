
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
const express= require("express");
const app= express();   

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//2. **Endpoints Disponibles:**
   
app.get("/", (req, res)=>{
    res.send(`
        <h1>Lista de usuarios</h1>
        <ul>
        ${usuarios
          .map(
            (usuario)=> `<li>ID: ${usuario.id} | Nombre:${usuario.nombre} | Edad:${usuario.edad} | Lugar procedencia:${usuario.lugarProcedencia}</li>`)
            .join("")}
            </ul>
            <form action="/usuarios" method="post">
            <label for "nombre">Nombre del personaje</label>
            <input type="test" id="nombre" name="nombre"required>
            <button type="submit">Agregar usuario</button>
            </form> 
            <a href="/usuarios/:nombre">usuarios json</a>
            `);
      });
      

///////////////////////////GET/usuarios`: Obtiene la lista de todos los usuarios.//////////////////////////////
app.get("/:usuarios", (req, res)=>{//accedemos a usuarios para que nos devuelva todo el json
    res.json(usuarios);
});

///////////////////////////POST/usuarios: Crea un nuevo usuario.//////////////////////////////
/*tengo que ir a postman Body/Raw y escribo por ejemplo, en este caso: {"nombre":"Mateo","edad":"8","lugarProcedencia":"Asturias"}*/
app.post("/usuarios/:nombre", (req, res)=>{
    console.log(req)
    const nuevoUsuario={
        id:usuarios.length +1, //cuéntame los usuarios que hay y súmale uno más
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,     
    };
    
    usuarios.push(nuevoUsuario)//añadimos este elemento
    res.redirect("/");//repsuesta una vez que demos a "agregar usuario"*/
})

///////////////////////////GET/usuarios/:nombre Obtiene un usuario por nombre//////////////////////////////
app.get("/usuarios/:nombre", (req, res)=>{//accedemos a usuarios para que nos devuelva un json
    res.json(usuarios[0]);
});

/*3. **Realizar Operaciones CRUD:**
   - Utiliza herramientas como Postman o cURL para realizar operaciones CRUD en la API.
   - Ejemplo: Para acceder al usuario Ryu, realiza una solicitud `GET` a `http://localhost:3000/usuarios/Ryu`.*/

//para ello descargamos POSTMAN (OK)


//BONUS

///////////////////////////PUT /usuarios/:nombre`: Actualiza la información de un usuario por nombre////////////////////////////
app.put("/usuarios/:nombre", (req, res)=>{
    const actualizarInfo = (dato) => dato ;
    usuarios.findIndex(actualizarInfo);
    res.redirect("/");
});

///////////////////////////DELETE /usuarios/:nombre`: Elimina un usuario por nombre////////////////////////////
app.delete("/usuarios/:nombre", (req, res)=>{
    const eliminarUsuario = usuarios.filter((usuario) =>usuario[0]);
    usuarios.pop(eliminarUsuario)
    res.redirect("/");
});

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


