const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

app.post("/broadcast", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message is required"
    });
  }

  const chatIds = JSON.parse(process.env.TELEGRAM_CHAT_IDS);

  const results = [];

  for (const chatId of chatIds) {
    try {
      await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: message
        }
      );

      results.push({
        chatId,
        status: "sent"
      });

    } catch (error) {
      results.push({
        chatId,
        status: "failed",
        error: error.response?.data || error.message
      });
    }
  }

  res.json({
    success: true,
    results
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
