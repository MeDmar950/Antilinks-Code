const mongoose = require('mongoose');

const Antilinks = new mongoose.Schema({
    Guild: String,
    run: String
});

module.exports = mongoose.model("Antilinks", Antilinks);