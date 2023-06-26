const  Alarm  = require('../models/alarm'); // Alarm 모델을 가져옴

const getAlarms = async () => {
  try {
    const alarms = await Alarm.findAll(); // 알람 테이블의 모든 레코드를 가져옴
    return alarms;
  } catch (error) {
    console.error('알람 정보 조회 중 에러 발생:', error);
    throw error;
  }
};

module.exports = getAlarms;