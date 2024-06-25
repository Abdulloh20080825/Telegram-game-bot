const TelegramBot = require("node-telegram-bot-api");
const token = "7217816062:AAEhiJc6dNBGrgG9aS4uwBQxJ6f1XR_deRY";

const bot = new TelegramBot(token, { polling: true });

const obj = {};

const gameOption = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "1",
          callback_data: "button_value",
        },
        {
          text: "2",
          callback_data: "button_value",
        },
        {
          text: "3",
          callback_data: "button_value",
        },
      ],
      [
        {
          text: "4",
          callback_data: "button_value",
        },
        {
          text: "5",
          callback_data: "button_value",
        },
        {
          text: "6",
          callback_data: "button_value",
        },
      ],
      [
        {
          text: "7",
          callback_data: "button_value",
        },
        {
          text: "8",
          callback_data: "button_value",
        },
        {
          text: "9",
          callback_data: "button_value",
        },
      ],
      [
        {
          text: "0",
          callback_data: "button_value",
        },
      ],
    ], 
  },
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
        `Assalomu Aleykum ${msg.chat.username}. Mizning platformga hush kelibsiz \n/info - Ozingiz haqida malumotlarni korish uchun`
      );
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Sizning telegram ismingiz ${msg.from?.first_name}\nSizning usernamingiz ${msg.from?.username}`
      );
    }
    if (text === "/game") {
      await bot.sendMessage(
        chatId,
        "Kompyuter 0 dan 9 gacha son oyladi siz shu sonni topishga harakat qiling !!"
      );
      const randomNumber = Math.floor(Math.random() * 10);
      obj[chatId] = randomNumber;
      return bot.sendMessage(chatId, "Togri sonni toping", gameOption);
    }

    bot.sendMessage(chatId, "Uzur men sizning gapngizni chunmadim");
  });
};

bootstrap();
