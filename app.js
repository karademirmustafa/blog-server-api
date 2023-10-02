const express = require("express");
const app = express();
const config = require("./config");
const loaders = require("./loaders");
const errorHandler = require("./middlewares/error");
const routes = require("./routes");

// Load config files  , dotenv
config();
// Upload loaders , DB
loaders();


// Parse body json
app.use(express.json());

// Routes
app.use("/authenticate",routes.auth);

// Global Error Handler :: must always be at the bottom
app.use(errorHandler)

const PORT = process.env.PORT || 1453;

app.listen(PORT,() => {
    console.log(`Server is running port : ${PORT}`)
})