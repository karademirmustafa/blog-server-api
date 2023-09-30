const express = require("express");
const app = express();
const config = require("./config");
const loaders = require("./loaders");
// Load config files  
config();
// Upload loaders , DB
loaders();


// Parse body json
app.use(express.json());


const PORT = process.env.PORT || 1453;

app.listen(PORT,() => {
    console.log(`Server is running port : ${PORT}`)
})