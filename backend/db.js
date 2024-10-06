import mongoose from "mongoose"

const URLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "A URL is required to shorten it."]
    },
    urlId: {
        type: String,
        required: [true, "URL ID is required to redirect to it."],
        unique: true
    }
})

const URL = mongoose.model('url', URLSchema);
export default URL