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

/* Skapa tabell */
client.query(`
    DROP TABLE IF EXISTS COURSES;
    CREATE TABLE courses(
        COURSEID SERIAL PRIMARY KEY,
        COURSENAME TEXT NOT NULL,
        COURSECODE TEXT NOT NULL,
        SYLLABUS TEXT NOT NULL,
        PROGRESSION TEXT NOT NULL,
        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);