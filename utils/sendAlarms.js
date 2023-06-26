const getAlarms = require('./getAlarms');
const  direction  = require('./direction');
const  weathersearch  = require('./weatherSearch');
const Alarm = require('../models/alarm');
const convertTime = require('./convertTime');
const axios = require('axios');

//이 부분 변경하기
const webhookUrl = '디스코드 서버에 연결된 웹훅 url';
const sendMessageToDiscord = async (message) => {
  try {
    const response = await axios.post(webhookUrl, { content: message });
    console.log('Message sent to Discord');
    console.log(response.data);
  } catch (error) {
    console.error('Error sending message to Discord:', error);
  }
};

// 알람 설정
const setAlarm = async () => {
  try {
    // DB에서 알람 정보 가져오기
    const alarms = await getAlarms();

    // 현재 시간 가져오기
    const now = new Date();

    // 알람 정보를 순회하면서 처리
    for (const alarmData of alarms) {
      const { alarmtime, memo, departure, destination, userId, alarmId } = alarmData;

      const convertedTime = convertTime(alarmtime);

      // 알람 시간과 현재 시간 비교
      const compareTime = new Date(convertedTime);
      if (compareTime <= now) {
        // Discord 웹후크를 통해 메시지 전송
        const route = await direction(departure, destination);
        const { endX, endY, googleMapUrl } = route;

        const { temperature, weather } = await weathersearch(endX, endY);

        const response = `도착지의 온도는 ${temperature}℃이며, 날씨는 ${weather}입니다.\n도착지까지 경로: ${googleMapUrl}\n메모:${memo}`;

        await sendMessageToDiscord(response);

        // 알람 삭제
        await Alarm.destroy({ where: { alarmId: alarmData.alarmId } });

        console.log('알람 메시지 전송 및 삭제 완료');
      }
    }
  } catch (error) {
    console.error('알람 처리 중 에러 발생:', error);
  }
};

// 알람 실행
const runAlarm = async () => {
  try {
    // 서버 시작 시에 알람 설정
    await setAlarm();

    // 1분마다 알람 설정 확인 및 실행
    setInterval(async () => {
      await setAlarm();
      const now = new Date();
      console.log(now);
    }, 60000);
  } catch (error) {
    console.error('알람 실행 중 에러 발생:', error);
  }
};

module.exports = runAlarm;