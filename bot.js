const Discord = require('discord.js');
const client = new Discord.Client();

const userAdmin = '101462082016260096';

const botId = '730084929693810691';
const botLogChannelId = '740500341346402306';
const botCommand = '!';

const elryusChannelId = '729854794986160168';
const elryusMessageId = '740225386050224249';

client.login(process.env.BOT_TOKEN);

// client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`); });

client.on('message', message => {
   // properties of the message
   // console.log(message); 

   if (message.channel.id == elryusChannelId && message.content.startsWith(botCommand) && message.author.id != botId) {
      logCommandRequest(message);

      var command = message.content.split(' ');

      // Removing loot
      if (command.length == 2) {
         if (command[0] === '!del' && command[1] >= 1 && command[1] <= 14) {
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
            });

            message.delete();
         }
      }
      // Adding loot
      else if (command.length >= 3) {
         if (command[0] === '!add' && command[1] >= 1 && command[1] <= 14) {
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
            });

            message.delete();
         }
      }
   }
});

function logCommandRequest(message) {
   client.channels.cache.get(botLogChannelId).send(`\`\`\`
Command requested: ${message.content}
Username: ${message.author.username}
Tag: ${message.author.tag}
\`\`\``);
}

function deleteMessagesFromChannel(message) {
   // User Admin rights
   if (message.author.id == userAdmin && message.content === `!del messages`) {
      console.log('Deleting messages...');
      async function clear() {
         message.channel.bulkDelete(100).catch(console.error);
      }
      clear();
      console.log('Messages deleted...');
   }
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