const axios = require('axios');

const scheduleAdd = async (userId,departure, destination, memo, alarmtime) => {
    // 일정 추가 기능 구현
    try {
    // Make a POST request to the '/alarm' endpoint to add the schedule
    const response = await axios.post('http://localhost:3000/alarm', {
      alarmtime: alarmtime,
      memo: memo,
      departure: departure,
      destination: destination,
      userId: userId,
    });
      const result = response.data.message;
      return (result);
      } catch (err) {
      //console.error(err);
      const result1 ='오류가 발생했습니다.\n입력값을 확인 해주세요.';
      retrun (result1)
      }
  };
  
  module.exports = {
    scheduleAdd
  };