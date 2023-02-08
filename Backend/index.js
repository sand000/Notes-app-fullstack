const express = require('express');

const PORT = 8080;
const userController = require("./Routes/user.routes");
const connection = require("./config/db");
const notesController = require('./Routes/notes.routes');
const authentication = require('./middlewares/authentication');

const app = express();

app.use(express.json());

app.use("/user", userController);
app.use("/notes", authentication, notesController)

app.listen(PORT, async()=>{
    try{
         await connection;
         console.log("connected to db")
    }
    catch(err){
         console.log("error connection to db")
    }
    console.log(`Listening on port ${PORT}`)
})