const express = require("express");
const app = express();
express().use("/api", app);

app.get("/", (req, res) => {
    res.send("API is working");
});

app.listen(8080);