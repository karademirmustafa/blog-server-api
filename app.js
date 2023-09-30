const express = require("express");
const app = express();
const config = require("./config");

// Load config files  
config();

app.use(express.json());


const PORT = process.env.PORT || 1453;

app.listen(PORT,() => {
    console.log(`Server is running port : ${PORT}`)
})