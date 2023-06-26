const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: '유저 정보를 입력해주세요' });
    }

    const user = await User.findOne({ where: { userId } });

    if (user) {
      return res.status(409).json({ result: 'fail', error: '이미 등록된 회원입니다.' });
    }

    await User.create({ userId });
    return res.status(200).json({ result: 'success', message: '유저 정보가 등록됬습니다.' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;