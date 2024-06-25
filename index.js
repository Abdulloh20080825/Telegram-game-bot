const TelegramBot = require("node-telegram-bot-api");
const token = "7217816062:AAEhiJc6dNBGrgG9aS4uwBQxJ6f1XR_deRY";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start") {
    return await bot.sendMessage(
      chatId,
      "Assalyamu Aleykum menig telegram botimga hush kelibsiz"
    );
  }

  if (text === "/info") {
    return await bot.sendMessage("Malumotlar bazasi");
  }
});
