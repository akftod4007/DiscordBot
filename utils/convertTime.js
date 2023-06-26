function convertTime(alarmTime) {
    const pattern = /(\d{1,2})일?\s?(\d{1,2})시\s?(\d{1,2})분/; // 띄어쓰기 옵션 추가
    const match = alarmTime.match(pattern);
  
    if (!match) {
      throw new Error('올바른 시간 형식이 아닙니다.');
    }
  
    const [, day, hour, minute] = match.map(str => parseInt(str, 10));
  
    if (day && (day < 1 || day > 31) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      throw new Error('올바른 범위의 시간을 입력해주세요.');
    }
  
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth();
    const date = day ? day : currentDate.getUTCDate(); // 일자 정보가 없으면 현재 날짜 사용
  
    const utcTime = new Date(Date.UTC(year, month, date, hour, minute));
  
    return utcTime;
  }
  
module.exports = convertTime;