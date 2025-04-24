const axios = require("axios");

exports.getWeather = async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is mandatory" });

  try {
    const apiKey = process.env.WEATHER_API_KEY; // Ваш ключ з weatherapi.com
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=uk`;

    const response = await axios.get(url);
    const data = response.data;

    return res.json({
      temperature: data.current.temp_c, // Температура в °C
      humidity: data.current.humidity, // Вологість у %
      description: data.current.condition.text, // Опис українською ("хмарно", "дощ" тощо)
    });
  } catch (err) {
    // Обробка специфічних помилок API
    if (err.response?.data?.error?.code === 1006) {
      return res.status(404).json({ error: "City couldn't be found..." });
    }
    return res.status(500).json({ error: "Fetching data error..." });
  }
};
