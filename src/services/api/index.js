require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("mongoose").connect(process.env.MONGO_URL);
const Room = require("./models/Room");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const secret = "sonolight";

app.get("/api", (req, res) => {
    res.send("API is working");
});

const withAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token)
        res.status(401).send("Unauthorized");
    else
        jwt.verify(token, secret, {}, (err, decoded) => {
            if (err) {
                res.status(401).send("Unauthorized");
            } else {
                req.isAdmin = decoded.isAdmin
                next();
            }
        });
};

app.get("/api/admin", withAuth, (req, res) => {
    if (!req.isAdmin) res.status(401).send("Unauthorized");
    res.status(200).send("Successfully connected");
});

app.post("/api/admin/auth", async (req, res) => {
    if (req.body.password == process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ isAdmin: true }, secret);
        res.cookie("token", token);
        res.cookie("roomId", req.body.roomId);

        if (!await Room.exists({roomId: req.body.roomId}))
            await Room.create({
                roomId: req.body.roomId
            });

        res.sendStatus(200);
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.post("/api/admin/logout", (req, res) => {
    res.cookie("token", undefined);
    res.cookie("roomId", undefined);

    res.sendStatus(200);
});

app.listen(8080);