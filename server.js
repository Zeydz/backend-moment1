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
const port = process.env.PORT || 3000;

/* View engine EJS */
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded( { extended: true}));

/* Route */
app.get("/", async(req, res) => {
    
    /* Läs ut från databasen */
    client.query("SELECT * FROM COURSES;", (err, result) => {
        if(err) {
            console.log("Fel vid DB-fråga");
        } else {
            res.render("index", {
                content: result.rows
            });
        }
    })
});

/* Lägg till kurs */
app.post("/addCourse", async (req, res) => {
    try {
        /* Data */
        const kurskod = req.body.kurskod;
        const kursnamn = req.body.kursnamn;
        const progression = req.body.progression;
        const syllabus = req.body.syllabus;

        /* Sql-fråga */
        const result = await client.query("INSERT INTO COURSES(COURSENAME, COURSECODE, SYLLABUS, PROGRESSION) VALUES ($1, $2, $3, $4)",
            [kursnamn, kurskod, syllabus, progression]
        );
        res.redirect("/");
    } catch (err) {
        console.error("Fel vid insättning av kurs:", err);
    }
});


/* Ta bort kurs */
app.post("/deleteCourse", async(req, res) => {
    const courseId = req.body.courseId;

    try {
        await client.query("DELETE FROM COURSES WHERE COURSEID = $1", [courseId]);
        res.redirect("/");
    } catch (err) {
        console.error("Fel vid borttagning av kurs:", err);
    }
});


app.get("/addcourse", async(req, res) => {
    res.render("addcourse");
});

app.get("/about", async(req, res) => {
    res.render("about");
});


/* Starta app */
app.listen(process.env.PORT, () => {
    console.log("Server started on port " + port);
})