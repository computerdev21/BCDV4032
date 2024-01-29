const express = require("express");
const router = express.Router();
const transactionMessage = require('../models/transaction'); // adjust the path to your Message model

const logic = require("../../ethereum/logic");

router.get("/", async (req,res,next) => {
    let message = await logic.getMessage();
    res.send(message);
})

router.post("/", async (req,res, next) => {
    let message = await logic.setMessage(req.body.message);
    let newTransaction = new transactionMessage({
        content: message
    });
    newTransaction.save()
        .then(() => {
            console.log('Message saved!');
            res.send(message.transactionHash);
        })
        .catch(err => {
            console.error('Error saving message:', err);
            res.status(500).send('Error saving message');
        });
    res.send(message.transactionHash);
})

module.exports = router;