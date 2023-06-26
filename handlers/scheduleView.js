const axios = require('axios');

const scheduleView = async (userId) => {
  try {
    const axiosUrl = `http://localhost:3000/alarm/${userId}`;
    const response = await axios.get(axiosUrl);
    const alarms = response.data;

    if (alarms.length > 0) {
      const formatAlarmList = (alarms) => {
        let formattedList = '';
      
        alarms.forEach((alarm) => {
          formattedList += `알람 ID: ${alarm.alarmId}\n`;
          formattedList += `알람 시간: ${alarm.alarmtime}\n`;
          formattedList += `메모: ${alarm.memo}\n`;
          formattedList += `출발지: ${alarm.departure}\n`;
          formattedList += `도착지: ${alarm.destination}\n\n`;
        });
      
        return formattedList;
      };

      return formatAlarmList(alarms);
    } else {
      const result = '알람이 존재하지 않습니다.'
      return result;
    }
  } catch (err) {
    //console.error(err);
    throw err;
  }
};

module.exports = {
  scheduleView
};