const axios = require('axios');

const scheduleUpdate = async (alarmId, userId, updatecontent, updatevalue) => {
  let mappedUpdateValue;

  switch (updatevalue) {
    case '1':
      mappedUpdateValue = 'alarmtime';
      break;
    case '2':
      mappedUpdateValue = 'departure';
      break;
    case '3':
      mappedUpdateValue = 'destination';
      break;
    case '4':
      mappedUpdateValue = 'memo';
      break;
    default:
      console.error('유효하지 않은 값입니다.');
      return;
  }

  try {
    const response = await axios.post(`http://localhost:3000/alarm/update`, {
      alarmId: alarmId,
      updatecontent: updatecontent,
      updatevalue: mappedUpdateValue,
      userId: userId,
    });
  
    console.log(response.data.message); // Print the response data
    if (response.data.result === 'success') {
      return '알람이 성공적으로 업데이트되었습니다.';
    } else {
      return '알람 업데이트에 실패했습니다.';
    }
  } catch (error) {
    console.error(error);
    return '알람 업데이트 중에 문제가 발생했습니다.';
  }
};

module.exports = {
  scheduleUpdate,
};