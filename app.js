const express = require("express");
const connectDB = require("./config/db");
const posts = require("./routes/posts");
const { engine } = require('express-handlebars');
const methodOverride = require("method-override");

const app = express();

app.engine('handlebars', engine());
app.set("view engine", "handlebars");

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/about", (req, res) => {
    res.render("about");
});

app.use("/posts", posts);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});