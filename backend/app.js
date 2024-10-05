const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const URL = require("./db");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.options('*', cors())

dotenv.config({ path: "./.env.local" })
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to DB"))

app.post('/url', function (req, res) {
    const { url } = req.body;


})
app.get('/:urlId', function (req, res) {

})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Server Started at " + PORT))