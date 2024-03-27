/* Anslutning */
const {Client} = require("pg");
require("dotenv").config();

/* Uppgifter till databas*/
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

/* Ansluter till databas */
client.connect((err) => {
    if(err) {
        console.log("Fel vid anslutning: " + err);
    } else {
        console.log("Ansluten till databasen...")
    }
});

/* Express och EJS */
const express = require("express");
const app = express();
const port = process.env.port | 3000;

/* View engine EJS */
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded( { extended: true}));

/* Route */
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/members", (req, res) => {
    res.render("addcourse");
});

app.get("/about", (req, res) => {
    res.render("about");
});


/* Starta app */
app.listen(port, () => {
    console.log("Server started on port " + port);
})