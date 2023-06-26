const axios = require('axios');

const scheduleDelete = async (alarmId, userId) => {
  try {
    const axiosUrl = `http://localhost:3000/alarm/delete/${alarmId}`;
    const params = {
      params: { userId },
    };

    const response = await axios.get(axiosUrl, params);
    const result = response.data.result;

    if (result === 'success') {
      return '알람이 삭제되었습니다.';
    } else if (result === 'fail') {
      const error = response.data.error;
      if (error === '알람이 존재하지 않습니다.') {
        throw new Error('알람을 찾을 수 없습니다.');
      } else if (error === '알람의 소유자가 아닙니다.') {
        throw new Error('알람의 소유자가 아닙니다. 다른 사용자의 알람에 접근할 수 없습니다.');
      } else {
        throw new Error('알람 삭제에 실패했습니다.');
      }
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  } catch (err) {
    console.error(err);
    if (err.response) {
      const status = err.response.status;
      if (status === 404) {
        throw new Error('알람 삭제 요청이 실패했습니다. 서버에서 알람을 찾을 수 없습니다.');
      } else if (status === 403) {
        throw new Error('알람 삭제 요청이 실패했습니다. 알람의 소유자가 아닙니다.');
      } else if (status === 400) {
        throw new Error('알람 삭제 요청이 실패했습니다. 알람 삭제에 실패했습니다.');
      }
    }
    throw new Error('알람 삭제 요청에 실패했습니다.');
  }
};

module.exports = {
  scheduleDelete
};
