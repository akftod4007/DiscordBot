const direction = require('../utils/direction');
const weatherSearch =require('../utils/weatherSearch');


const directionSearch = async (departure, destination) => {
    // 경로검색 기능 구현
    const route = await direction(departure, destination);
    const { endX, endY, googleMapUrl } = route;  
    // utils 모듈에서 weatherSearch 함수 호출
    const { temperature, weather } = await weatherSearch(endX, endY);  
    const response = `도착지의 온도는 ${temperature}℃이며, 날씨는 ${weather}입니다.\n도착지까지 경로: ${googleMapUrl}`;
    return response;
  }; 
  module.exports = {
    directionSearch
  };