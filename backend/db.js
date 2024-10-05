const mongoose = require("mongoose");
const nanoid = require("nanoid");

const URLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "A URL is required to shorten it."]
    },
    urlId: {
        type: UUID,
        default: nanoid(7),
    }
})

const URL = mongoose.model('url', URLSchema);

export default URL;