const express = require('express');
const morgan =require('morgan');
const bodyParser = require('body-parser');
const { Client, Intents } = require('discord.js');
const { token } = require('./config/config.json');
const { sequelize } = require('./models');
const runAlarm = require('./utils/sendAlarms');

const app = express();

const userRouter =require('./routes/user')
const alarmRouter =require('./routes/alarm')


app.use(bodyParser.json());
app.use('/user',userRouter);
app.use('/alarm',alarmRouter);

//핸들러 함수
const handleMessageCreate = require('./handlers/index');

sequelize.sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공'))
  .catch(err => console.error(err));

const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
  
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', handleMessageCreate);

runAlarm();  
client.login(token);