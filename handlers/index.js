const { directionSearch } = require('./directionSearch');
const { scheduleAdd } = require('./scheduleAdd');
const { addUser } = require('./addUser');
const { scheduleUpdate } = require('./scheduleUpdate');
const { scheduleView } = require('./scheduleView');
const { scheduleDelete } = require('./scheduleDelete');

async function handleMessageCreate(message) {
  const content = message.content;

  if (content.startsWith('!경로검색')) {
    const userId = message.author.id;
    await message.reply('출발지 입력:');

    const filter = (m) => m.author.id === userId;
    const collector = message.channel.createMessageCollector({ filter, time: 30000 });

    let departure = '';
    let destination = '';

    collector.on('collect', async (collected) => {
      const collectedContent = collected.content;

      if (!departure) {
        departure = collectedContent;
        await collected.reply('도착지 입력:');
      } else if (!destination) {
        destination = collectedContent;
        collector.stop();
        try{
          const response = await directionSearch(departure, destination);
        message.channel.send(response);
        }
        catch(error){
          //console.error(error);
          message.channel.send('경로 검색에 실패했습니다.');
        }
      }   
    });
  }
  else if (content.startsWith('!일정추가')) {
    const userId = message.author.id;
    await message.reply('출발지 입력:');

    const filter = (m) => m.author.id === userId;
    // time은 타임 아웃 시간
    const collector = message.channel.createMessageCollector({ filter, time: 30000 });

    let departure = '';
    let destination = '';
    let memo = '';
    let alarmtime = '';

    collector.on('collect', async (collected) => {
        const collectedContent = collected.content;

        if (!departure) {
            departure = collectedContent;
            await collected.reply('도착지 입력:');
        } else if (!destination) {
            destination = collectedContent;
            await collected.reply('메모 입력:');
        } else if (!memo) {
            memo = collectedContent;
            await collected.reply('시간 입력:');
        } else if (!alarmtime) {
            alarmtime = collectedContent;
            collector.stop();

          const result1 = await addUser(userId);
          message.channel.send(result1);
          
          const result2 = await scheduleAdd(userId,departure,destination,memo,alarmtime)
          message.channel.send(result2);

          const response1 = `출발지:${departure}\n도착지:${destination}\n메모:${memo}\n알람시간${alarmtime}`;
          message.channel.send(response1);
        }
      })
  }
  
  
  else if (content.startsWith('!일정수정')) {
    const userId = message.author.id;
    const alarmList = await scheduleView(userId);
    message.channel.send(alarmList);
  
    let updatevalue = '';
    let updatecontent = '';
  
    let alarmId;
  
    await message.reply('수정을 원하는 알람 번호 입력:');
  
    const filter = (m) => m.author.id === userId;
    const collector = message.channel.createMessageCollector({ filter, time: 30000 });
  
    collector.on('collect', async (collected) => {
      const collectedContent = collected.content;
  
      if (!alarmId) {
        alarmId = collectedContent;
        await collected.reply('수정을 원하는 사항을 입력해 주세요.\n 1.알람시간:날짜/시간/분으로 입력해주세요. \n2.출발지 \n3.도착지 \n4.메모');
      } else if (!updatevalue) {
        updatevalue = collectedContent;
        await collected.reply('수정할 내용을 입력하세요.');
      } else if (!updatecontent) {
        updatecontent = collectedContent;
        collector.stop();
  
        const response = await scheduleUpdate(alarmId, userId, updatecontent, updatevalue);
        message.channel.send(response);
      }
    });
  }
  
  
  else if (content.startsWith('!일정조회')) {
    const userId = message.author.id;
    const alarmList = await scheduleView(userId);
    message.channel.send(alarmList);
  }
  
  else if (content.startsWith('!일정삭제')) {
    const userId = message.author.id;
    const alarmList = await scheduleView(userId);
    message.channel.send(`알람 목록:\n${alarmList}`);
    let alarmId = "";
  
    await message.reply('삭제할 알람 번호 입력:');
  
    const filter = (m) => m.author.id === userId;
    const collector = message.channel.createMessageCollector({ filter, time: 30000 });
  
    collector.on('collect', async (collected) => {
      const collectedContent = collected.content;
      alarmId = collectedContent;
      collector.stop();
      try {

        const result =  await scheduleDelete(alarmId, userId);
        message.reply(result);
      } catch (error) {
        message.reply(error.message);
      }
    });
  }

  else if (content.startsWith('!설명')) {
    const response = `현재 제공하는 기능은 다음과 같습니다:\n\n` +
      `1. 경로검색: 출발지와 도착지를 입력하여 최적의 경로를 검색합니다.\n` +
      `2. 일정추가: 일정에 출발지, 도착지, 메모, 알람시간을 추가합니다.\n` +
      `3. 일정수정: 기존 일정을 수정합니다.\n` +
      `4. 일정조회: 사용자가 등록한 모든 일정을 조회합니다.\n` +
      `5. 일정삭제: 등록된 일정 중 특정 알람 시간의 일정을 삭제합니다.\n\n` +
      `각 명령어를 사용하기 위해서는 해당 명령어 다음에 필요한 정보를 입력해야 합니다.\n` +
      `예를 들어, 경로검색은 '!경로검색 출발지 도착지'와 같이 사용합니다.\n` +
      `자세한 사용법은 각 명령어의 설명을 참조해주세요.`;
  
    message.channel.send(response)
      .catch(error => {
        console.error(error);
        message.channel.send('메시지를 전송하는데 실패했습니다.');
      });
  } else {
    if (content.startsWith('!')) {
      message.channel.send('`!설명`을 입력해주세요.');
    }
  }
}

module.exports = handleMessageCreate;