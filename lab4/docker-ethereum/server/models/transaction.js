const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
});

const transactionMessage = mongoose.model("Message", transactionSchema);

module.exports = transactionMessage;