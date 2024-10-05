import mongoose from "mongoose"
import { nanoid } from "nanoid";

const URLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "A URL is required to shorten it."]
    },
    urlId: {
        type: String,
        default: nanoid(7),
        unique: true
    }
})

const URL = mongoose.model('url', URLSchema);
export default URL