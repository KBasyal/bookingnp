// models/About.js
const mongoose = require('mongoose');



const AboutSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    team: [
        {
            name: String,
            position: String,
        },
    ],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
    },
},
    {
        timestamps: true, // createdAt, updatedAt keys area auto-added
        autoCreate: true, // create the table
        autoIndex: true, // indexing
    }
);

const AboutModel = mongoose.model('About', AboutSchema);

module.exports = AboutModel;
