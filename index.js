const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const blogController = require("./routes/Blog.routes")

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hi, Welcome to Blog App");
})

app.use("/blog", blogController);


app.listen(8080, async () => {
    try {
        await connection;
        console.log("connected to db");
    } catch (error) {
        console.log("connection failed");
    }

    console.log("server started");
})