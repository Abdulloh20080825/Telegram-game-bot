const TelegramBot = require("node-telegram-bot-api");

const { gameOption, againOption } = require("./options");

const token = "7217816062:AAEhiJc6dNBGrgG9aS4uwBQxJ6f1XR_deRY";

const bot = new TelegramBot(token, { polling: true });

const obj = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Kompyuter 0 dan 9 gacha son oyladi siz shu sonni topishga harakat qiling !!"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  obj[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Togri sonni toping", gameOption);
};

const bootstrap = () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "bot haqida malumot",
    },
    {
      command: "/info",
      description: "Ozingiz haqida malumot",
    },
    {
      command: "/game",
      description: "Oyin oynash",
    },
  ]);
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      console.log(msg);
      return bot.sendMessage(
        chatId,
        `Assalomu Aleykum ${msg.chat.username}. Bizning platformga hush kelibsiz \n/info - Ozingiz haqida malumotlarni korish uchun\n/game - Oyin oynash uchun`
      );
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Sizning telegram ismingiz - ${msg.from?.first_name}\nSizning usernamingiz - ${msg.from?.username}`
      );
    }
    if (text === "/game") {
      return startGame(chatId);
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data == "/again") {
      return startGame(chatId);
    }

    if (data == obj[chatId]) {
      return bot.sendMessage(
        chatId,
        `Tabriklaymiz siz tog'ri javob berdingiz, kompyuter ${obj[chatId]} ushbu sonni oylagan edi `
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Siz tanlagan son ${data} hato, kompyuter ${obj[chatId]} ushbu sonni tanlagan edi`,
        againOption
      );
    }
  });
};

bootstrap();
