const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_IDS;

//Post to send 
app.post('/broadcast', async (req, res) => {
    const { message }  = req.body;
    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_IDS,
            text: message
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
