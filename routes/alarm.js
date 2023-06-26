const express = require('express');
const Alarm = require('../models/alarm');
const User = require('../models/user');

const router = express.Router();

// 알람 등록
router.post('/', async (req, res, next) => {
    const { alarmtime, memo, departure, destination, userId } = req.body;
    const userInfo = await User.findOne({
        where: { userId: userId }
    });

    if (userInfo) {
        await Alarm.create({
            alarmtime: alarmtime,
            userId: userId,
            departure: departure,
            destination: destination,
            memo: memo,
        });
        res.status(200).json({ "result": "success", "message": "알람 등록이 완료되었습니다." });
    } else {
        res.status(400).json({ "result": "failure", "message": "유저 정보를 찾을 수 없습니다." });
    }
});

// 알람 전체 조회
router.get('/', async (req, res, next) => {
    try {
        const AlarmList = await Alarm.findAll({});
        res.json(AlarmList);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// 유저 id로 알람 조회
router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const alarms = await Alarm.findAll({
            where: { userId: userId }
        });

        if (alarms.length > 0) {
            res.status(200).json(alarms);
        } else {
            res.status(404).json({ error: '알람이 존재하지 않습니다.' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 알람 삭제
router.get('/delete/:id', async (req, res, next) => {
    try {
      const alarmId = req.params.id;
      const userId = req.query.userId;
    
      // 알람 조회
      const alarm = await Alarm.findOne({
        where: { alarmId },
      });
  
      if (!alarm) {
        // 알람이 존재하지 않을 경우
        return res.status(404).json({ result: 'fail', error: '알람이 존재하지 않습니다.' });
      }
  
      if (alarm.userId !== userId) {
        // 알람의 소유자가 요청한 사용자와 다를 경우
        return res.status(403).json({ result: 'fail', error: '알람의 소유자가 아닙니다.' });
      }
  
      // 알람 삭제
      const result = await Alarm.destroy({
        where: { alarmId },
      });
  
      if (result) {
        // 알람 삭제 성공
        res.status(200).json({ result: 'success', message: '알람이 삭제되었습니다.' });
      } else {
        // 알람 삭제 실패
        next(res.status(400).json({ result: 'fail', error: '알람 삭제에 실패했습니다.' }));
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  
//알람 업데이트
router.post('/update', async (req, res, next) => {
    try {
        const { updatecontent, updatevalue, userId, alarmId } = req.body;
        
        const alarm = await Alarm.findOne({ where: { alarmId, userId } });
        
        if (!alarm) {
            return res.status(404).json({ "result": "fail", "error": '알람을 찾지 못했습니다.' });
        }

        const result = await Alarm.update(
            {
                [updatevalue]: updatecontent,
            },
            {
                where: { alarmId, userId },
            }
        );

        if (result) {
            res.status(200).json({ "result": "success", "message": "알람 정보가 업데이트되었습니다." });
          } else {
            res.status(409).json({ "result": "fail", "error": "알람을 업데이트하는 중에 문제가 발생했습니다." });
          }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;