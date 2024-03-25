

const express = require("express");
const app = express();
const port = 3000;

/* View engine EJS */
app.set("view engine", "ejs");
app.use(express.static("public"));


/* Route */
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/members", (req, res) => {
    res.render("members");
});

app.get("/about", (req, res) => {
    res.render("about");
});




/* Starta app */
app.listen(port, () => {
    console.log("Server started on port " + port);
})