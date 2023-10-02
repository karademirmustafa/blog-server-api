const express = require("express");
const app = express();
const config = require("./config");
const loaders = require("./loaders");
const routes = require("./routes");


const loggerMiddleware = require("./middlewares/logger")
const errorHandler = require("./middlewares/error");

// Load config files  , dotenv
config();
// Upload loaders , DB
loaders();


// Parse body json
app.use(express.json());
// Logger 
app.use(loggerMiddleware)

// Routes
app.use("/authenticate",routes.auth);

// Global Error Handler :: must always be at the bottom
app.use(errorHandler)

const PORT = process.env.PORT || 1453;

app.listen(PORT,() => {
    console.log(`Server is running port : ${PORT}`)
})