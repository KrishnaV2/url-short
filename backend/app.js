import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import URL from "./db.js"

const app = express();

app.use(express.json());
app.use(cors({
    origin: "",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.options('*', cors())

dotenv.config({ path: "./.env.local" })
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to DB"))

app.post('/api/v1/url', postURL)
app.get('/api/v1/url/:urlId', getURL)
async function postURL(req, res) {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ "status": "fail", "message": "URL is missing" });
        let data = await URL.findOne({ url });
        if (data) return res.status(200).json({ "status": "success", "id": data.urlId });
        data = await URL.create({ url });
        if (!data) return res.status(200).json({ "status": "fail", "message": "URL could not be created. Try Again." });
        return res.status(200).json({ "status": "success", "id": data.urlId });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "status": "fail", "message": "Internal Server Error" });
    }
}
async function getURL(req, res) {
    try {
        const { urlId } = req.params
        if (!urlId) return res.status(400).json({ "status": "fail", "message": "URL ID is missing" });
        const data = await URL.findOne({ urlId });
        if (!data) return res.status(200).json({ "status": "fail", "message": "No URL found with given ID" });
        return res.status(200).json({ "status": "success", "url": data.url });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "status": "fail", "message": "Internal Server Error" });
    }
}
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Server Started at " + PORT))