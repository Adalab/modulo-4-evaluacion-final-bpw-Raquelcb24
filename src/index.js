const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config(); //configurar para usar las variables de entorno creadas

const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=>{
    console.log(`Server running in port : http://localhost:${PORT}`);
});

async function conexion(){ // creo la funcion para conectar con mi base de datos. Es asincrona porque tengo que ir a la base de datos 
    const conex = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
    await conex.connect();
    console.log('conexion con la BD ' + conex.threadId) //comprobar si se esta conectando con la BD ejecutando la funcion
    return conex;
};
/* conexion() */

//endpoint que busca todos los personajes
server.get("/characters", async(req, res)=>{
    try{
        const conn = await conexion()  //conectar con la BD
        const select = "SELECT * FROM characters"; //busco en mi base de datos con un select todos los personajes
        const [result] = await conn.query(select) //recojo el resultado del select que siempre es un array y ejecuto la funcion query en mi conexion de lo que tiene Select
        await conn.end(); 
        
    res.status(200).json( {
        info: { count: result.length }, // número de elementos
        results: result, // listado
     });
    }catch(error){
        res.status(200).json(error)
    }
});

//endpoint para obtener el personaje filtrado por id
server.get("/characters/:id", async (req, res)=>{
    try{
        const { id } = req.params; //recojo los datos que me devuelve de la url. Siempre me va a devolver un objeto, aplico destructuring y significa que el id es igual a lo que me devuelvas por la url.
        const conn = await conexion(); //vuelvo a conectar con mi BD
        const select = 'select * from characters where id = ?'; //busco por nombre 
        const [results] = await conn.query(select, [id]); // id lo obtengo del req.params

        if (results.length === 0){
            res.status(400).json({message: "This character does not exist in the database"});
           }else {
            res.status(200).json({results: results[0]}); //para no devolver un array y me devuelva un objeto
           }
    }catch(error){
        res.status(400).json(error)
    }

});

//endpoint para añadir un nuevo personaje
server.post("/newCharacter", async (req, res)=>{
    const conn = await conexion(); //vuelvo a conectar con mi BD
    const {name, gender, ocupation, image} = req.body; //recibo los datos por body desde el front. Como es un objeto lo que voy a recibir, hago mi destructuring del objeto con los nombres que son iguales a las columnas de mysql
    const insert = "INSERT INTO characters (name, gender, ocupation, image) VALUES (?, ?, ?, ?)";
    const [newCharacter] = await conn.query(insert, [name, 
        gender, 
        ocupation, 
        image,
    ]);
    res.status(200).json({
        success: true,
        id: newCharacter.insertId,
});
    await conn.end();
});

//endpoint que modifica por id
server.put("/characters/:id", async(req, res)=>{
    const conn = await conexion();
    const idNewCharacter = req.params.id;
    const changedCharacter = req.body;
    const update = "UPDATE characters SET name = ?, gender = ?, ocupation = ?, image = ? WHERE id = ?;";
    const [results] = await conn.query(update, [
        changedCharacter.name,
        changedCharacter.gender,
        changedCharacter.ocupation,
        changedCharacter.image,
        idNewCharacter
    ]);
    if(results.affectedRows > 0){
        res.status(200).json({success: true, message: "The character was modified successfully"})
    }else{
        res.status(200).json({success: false, message: "This character does not exist"})
    }
    console.log(results)
});

server.delete("/characters/:id", async (req, res)=>{
    const conn = await conexion();
    const idDeletedCharacter = req.params.id;
    const deletedCharacter = req.body;
    const deleteSql = "DELETE FROM characters WHERE id = ?;";
    const [results] = await conn.query(deleteSql, [idDeletedCharacter]);
    if(results.affectedRows > 0){
        res.status(200).json({success: true, message: "The character was deleted successfully"})
    }else{
        res.status(200).json({success: false, message: "This character does not exist"})
    }
    console.log(results)
});