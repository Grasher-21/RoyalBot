const Discord = require('discord.js');
const client = new Discord.Client();

const userAdmin = '101462082016260096';

const botId = '730084929693810691';
const botLogChannelId = '740500341346402306';
const botTestChannelId = '741013228653641769';
const botCommand = '!';

const generalChannelId = '729853752911069275';

const elryusChannelId = '729854794986160168';
const elryusMessageId = '740225386050224249';

client.login(process.env.BOT_TOKEN);

client.on('message', message => {
   // properties of the message
   // console.log(message);

   if (message.author.id == userAdmin && message.content.startsWith(botCommand)) {
      var command = message.content.split(' ');

      switch (command[0]) {
         case '!del': // Delete messages
            if (command.length == 3 && command[1] > 0 && command[2] == 'messages') {
               async function deleteMessages() {
                  message.channel.bulkDelete(command[1]).catch(console.error);
               }

               deleteMessages();
            }
            break;
      }
   }

   if (message.channel.id == botTestChannelId) {
      if (message.author.id != userAdmin && message.author.id != botId) {
         message.delete();
      }
      else {
         var command = message.content.split(' ');

         switch (command[0]) {
            case '!roll':
               if (command.length == 2 && !isNaN(command[1]) && command[1] > 0) {
                  var rng = Math.random() * command[1];
                  message.channel.send(`value generated: ${rng}`);
                  message.channel.send(`value round: ${Math.round(rng)}`);
                  message.channel.send(`value floor: ${Math.floor(rng)}`);

                  var number = Math.round((Math.random() * command[1]) + 1);
                  message.reply(`number rolled: ${number}`);
               }
               break;
         }
      }
   }
   else if (message.channel.id == elryusChannelId && message.content.startsWith(botCommand) && message.author.id != botId) {
      logCommandRequest(message);

      var command = message.content.split(' ');

      switch (command[0]) {
         case '!del': // Removing loot
            if (command.length == 2 && command[1] >= 1 && command[1] <= 14) {
               message.channel.messages.fetch(elryusMessageId).then(msg => {
                  var msgArray = msg.content.split('\n');

                  if (command[1] >= 1 && command[1] <= 9) {
                     msgArray[command[1]] = `#${command[1]}  = Empty`;
                  }
                  else {
                     msgArray[command[1]] = `#${command[1]} = Empty`;
                  }

                  var newMessage = '';
                  for (var i = 0; i < msgArray.length; i++) {
                     newMessage += msgArray[i] + '\n';
                  }

                  msg.edit(newMessage);

                  notifySuccessRequest(message);
               });
            }
            else {
               invalidCommand(message);
            }
            break;

         case '!add': // Adding loot
            if (command.length >= 3 && command[1] >= 1 && command[1] <= 14) {
               message.channel.messages.fetch(elryusMessageId).then(msg => {
                  var msgArray = msg.content.split('\n');

                  if (command[1] >= 1 && command[1] <= 9) {
                     msgArray[command[1]] = `#${command[1]}  = `;
                  }
                  else {
                     msgArray[command[1]] = `#${command[1]} = `;
                  }

                  for (var i = 2; i < command.length; i++) {
                     msgArray[command[1]] += command[i] + ' ';
                  }

                  var newMessage = '';
                  for (var i = 0; i < msgArray.length; i++) {
                     newMessage += msgArray[i] + '\n';
                  }

                  msg.edit(newMessage);

                  notifySuccessRequest(message);
               });
            }
            else {
               invalidCommand(message);
            }
            break;
      }
   }
   else if (message.channel.id == generalChannelId && message.content.startsWith(botCommand) && message.author.id != botId) {
      logCommandRequest(message);

      var command = message.content.split(' ');

      switch (command[0]) {
         case '!roll':
            if (command.length == 2 && !isNaN(command[1]) && command[1] > 0) {
               var number = Math.round((Math.random() * command[1]) + 1);
               message.reply(`number rolled: ${number}`);
            }
            break;
      }
   }
   else if (message.channel.id == botLogChannelId && message.author.id != botId) {
      message.delete();
   }
});

function logCommandRequest(message) {
   var nickname = 'n/a';

   if (message.member.nickname) {
      nickname = message.member.nickname;
   }

   client.channels.cache.get(botLogChannelId).send(`\`\`\`
Command requested: ${message.content}
UserID: ${message.author.id}
Nickname: ${nickname}
Username: ${message.author.username}
Tag: ${message.author.tag}
\`\`\``);
}

function notifySuccessRequest(message) {
   message.reply('command executed successfully!').then(msg => {
      msg.delete({ timeout: 5000 });
   });

   message.delete({ timeout: 5000 });
}

function invalidCommand(message) {
   message.reply('invalid command!').then(msg => {
      msg.delete({ timeout: 5000 });
   });

   message.delete({ timeout: 5000 });
}

var elryusInitialMessage = `\`\`\`Loot in Elryus' Island chests
#1  = Empty
#2  = Empty
#3  = Empty
#4  = Empty
#5  = Empty
#6  = Empty
#7  = Empty
#8  = Empty
#9  = Empty
#10 = Empty
#11 = Empty
#12 = Empty
#13 = Empty
#14 = Empty
\`\`\``;