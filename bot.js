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

const blackListChannelId = '741366781079453726';
const blackListMessageId = '741464092211937282';

const messageQuote = `\`\`\``;

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
   client.channels.cache.get(botLogChannelId).send('*is back online*');
});

client.on('message', message => {
   // properties of the message
   // console.log(message);

   // User administrator commands
   if (message.author.id == userAdmin && message.content.startsWith(botCommand)) {
      var command = message.content.split(' ');

      switch (command[0]) {
         case '!del': // Delete messages
         case '!delete':
            if (command.length == 3 && command[1] > 0 && (command[2] == 'message' || command[2] == 'messages')) {
               var messagesToDelete = Number(command[1]) + 1;
               async function deleteMessages() {
                  message.channel.bulkDelete(messagesToDelete).catch(console.error);
               }

               deleteMessages();
            }
            break;
      }
   }

   // Test channel
   if (message.channel.id == botTestChannelId) {
      if (message.author.id != userAdmin && message.author.id != botId) {
         message.delete();
      }
      else {
         var command = message.content.split(' ');

         switch (command[0]) {
            case '!roll':
               if (command.length == 2 && !isNaN(command[1]) && command[1] > 1) {
                  var rng = Math.floor(Math.random() * command[1]) + 1;
                  message.reply(`number rolled: ${rng}`);
               }
               break;
         }
      }
   }
   // Elryus Channel
   else if (message.channel.id == elryusChannelId && message.content.startsWith(botCommand) && message.author.id != botId) {
      logCommandRequest(message);

      var command = message.content.split(' ');

      switch (command[0]) {
         case '!del': // Removing loot
         case '!delete':
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
         default:
            invalidCommand(message);
            break;
      }
   }
   // General Channel
   else if (message.channel.id == generalChannelId && message.content.startsWith(botCommand) && message.author.id != botId) {
      logCommandRequest(message);

      var command = message.content.split(' ');

      switch (command[0]) {
         case '!roll': // Generating a random number
            if (command.length == 2 && !isNaN(command[1]) && command[1] > 1) {
               var rng = Math.floor(Math.random() * command[1]) + 1;
               message.reply(`rolled number between 1 and ${command[1]} --> **${rng}**`);
            }
            else {
               invalidCommand(message);
            }
            break;
         default:
            invalidCommand(message);
            break;
      }
   }
   // Black Listed Channel
   else if (message.channel.id == blackListChannelId && message.content.startsWith(botCommand) && message.author.id != botId) {
      logCommandRequest(message);

      var header = 'NAME                           | ROLE';
      var nameMaxLength = 30;
      var roleMaxLength = 50;

      var command = message.content.split(' ');

      switch (command[0]) {
         case '!add': // Adding to the black list
            if (command.length == 3) {
               message.channel.messages.fetch(blackListMessageId).then(msg => {
                  var newEntry = '';

                  if (command[1].length < nameMaxLength) {
                     newEntry = command[1];

                     for (var i = command[1].length; i < nameMaxLength; i++) {
                        newEntry += ' ';
                     }
                  }
                  else {
                     newEntry = command[1].substring(0, nameMaxLength);
                  }

                  newEntry += ' | ';

                  if (command[2].length < roleMaxLength) {
                     newEntry += command[2];

                     for (var i = command[2].length; i < roleMaxLength; i++) {
                        newEntry += ' ';
                     }
                  }
                  else {
                     newEntry += command[2].substring(0, roleMaxLength);
                  }

                  var msgArray = msg.content.split('\n');
                  msgArray.splice(0, 2); // Removing the characters that opens the quoting and the header
                  msgArray.splice(msgArray.length - 1, 1); // Removing the characters that closes the quoting
                  msgArray.push(newEntry);
                  msgArray.sort();

                  var entryList = '';
                  for (var i = 0; i < msgArray.length; i++) {
                     entryList += msgArray[i];

                     if (i != msgArray.length - 1) {
                        entryList += '\n';
                     };
                  }

                  msg.edit(`${messageQuote}\n${header}\n${entryList}\n${messageQuote}`);

                  notifySuccessRequest(message);
               });
            }
            else {
               invalidCommand(message);
            }
            break;
         case '!del':
         case '!delete': // Removing from the black list
            message.channel.messages.fetch(blackListMessageId).then(msg => {
               if (command.length == 2) {
                  var msgArray = msg.content.split('\n');
                  msgArray.splice(0, 2); // Removing the characters that opens the quoting and the header
                  msgArray.splice(msgArray.length - 1, 1); // Removing the characters that closes the quoting

                  var findPlayer = false;

                  for (var i = 0; i < msgArray.length; i++) {
                     var playerName = msgArray[i].substring(0, nameMaxLength);
                     playerName = playerName.trim();

                     if (command[1] == playerName) {
                        findPlayer = true;
                        msgArray.splice(i, 1);
                        i--;
                     }
                  }

                  if (findPlayer) {
                     var entryList = '';
                     for (var i = 0; i < msgArray.length; i++) {
                        entryList += msgArray[i];

                        if (i != msgArray.length - 1) {
                           entryList += '\n';
                        };
                     }

                     msg.edit(`${messageQuote}\n${header}\n${entryList}\n${messageQuote}`);

                     notifySuccessRequest(message);
                  }
                  else {
                     notifyPlayerDoesNotExist(message);
                  }
               }
               else {
                  invalidCommand(message);
               }
            });
            break;
         case '!reset': // Reseting the layout of the black list (only user admin can reset)
            if (message.author.id == userAdmin) {
               message.channel.messages.fetch(blackListMessageId).then(msg => {
                  msg.edit(`${messageQuote}\n${header}\n${messageQuote}`);
               });

               notifySuccessRequest(message);
            }
            else {
               invalidCommand(message);
            }
            break;
         default: // All other kind of messages will be deleted to keep the channel clean
            invalidCommand(message);
            break;
      }
   }
   // Log Channel
   else if (message.channel.id == botLogChannelId && message.author.id != botId) {
      message.delete();
   }
});

function logCommandRequest(message) {
   var nickname = 'n/a';

   if (message.member.nickname) {
      nickname = message.member.nickname;
   }

   client.channels.cache.get(botLogChannelId).send(`${messageQuote}
Requested command: ${message.content}
Channel: ${message.channel.name}
Nickname: ${nickname}
Username: ${message.author.username}
Tag: ${message.author.tag}
UserID: ${message.author.id}
${messageQuote}`);
}

function notifySuccessRequest(message) {
   message.reply('command executed successfully!').then(msg => {
      msg.delete({ timeout: 5000 });
   });

   message.delete({ timeout: 5000 });
}

function notifyPlayerDoesNotExist(message) {
   message.reply('that player does not exist!').then(msg => {
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