const axios = require('axios');
const widfuc = require('./widFuc');

async function weatherSearch(latitude, longitude) {
  //이부분 변경
  const apiKey = '2766767082d5f88288930929906c749e'
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  const weatherResponse = await axios.get(weatherUrl);
  const weatherData = weatherResponse.data;
  const temperature = weatherData.main.temp;
  const wid = weatherData.weather[0].id;
  const weather = widfuc(wid);

  return {
    temperature,
    weather,
  };
}


module.exports = weatherSearch;