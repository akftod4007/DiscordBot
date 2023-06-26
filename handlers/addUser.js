const axios = require('axios');

const addUser = async (userId) => {
  try {
    const response = await axios.post('http://localhost:3000/user', {
      userId: userId,
    });
    const result = response.data.message;
    return result;
  } catch (err) {  
    //console.error(err);
    const result1 = '이미 등록된 회원입니다.'
    return result1;
  }
};

module.exports = {
    addUser
  };
    