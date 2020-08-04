const Discord = require('discord.js');
const client = new Discord.Client();

const botId = 730084929693810691;
const botCommand = '!';

const userAdmin = 101462082016260096;
const elryusMessageId = '740225386050224249';

client.login(process.env.BOT_TOKEN);

client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`); });

client.on('message', message => {
	// console.log(message); // properties of the message
	
	if (message.channel.id == 729854794986160168) // Elryus channel
	// if (message.channel.id == 735441393090035835) // Bot Channel
	{
		// User Admin rights
		// if (message.author.id == userAdmin &&
			// message.content === `!del messages`)
		// {
			// console.log('Deleting messages...');
			// async function clear() {
				// message.channel.bulkDelete(100).catch(console.error);
			// }
			// clear();
			// console.log('Messages deleted...');
		// }
		
		if (message.content.startsWith(botCommand) &&
			message.author.id != botId)
		{
			var command = message.content.split(' ');
			
			// Removing loot
			if (command.length == 2) 
			{
				if (command[0] === '!del' && command[1] >= 1 && command[1] <= 14)
				{
					message.channel.messages.fetch(elryusMessageId)
						.then(msg => {
							var msgArray = msg.content.split('\n');
							
							if (command[1] >= 1 && command[1] <= 9)
							{
								msgArray[command[1]] = `#${command[1]}  = Empty`;
							}
							else
							{
								msgArray[command[1]] = `#${command[1]} = Empty`;
							}
							
							var newMessage = '';
							for(var i = 0; i < msgArray.length; i++)
							{
								newMessage += msgArray[i] + '\n';
							}
							
							msg.edit(newMessage);
						});
					
					message.delete();
				}
			}
			// Adding loot
			else if (command.length >= 3) 
			{
				if (command[0] === '!add' && command[1] >= 1 && command[1] <= 14)
				{
					message.channel.messages.fetch(elryusMessageId)
						.then(msg => {
							var msgArray = msg.content.split('\n');
							
							if (command[1] >= 1 && command[1] <= 9)
							{
								msgArray[command[1]] = `#${command[1]}  = `;
							}
							else
							{
								msgArray[command[1]] = `#${command[1]} = `;
							}
							
							for(var i = 2; i < command.length; i++)
							{
								msgArray[command[1]] += command[i] + ' ';
							}
							
							var newMessage = '';
							for(var i = 0; i < msgArray.length; i++)
							{
								newMessage += msgArray[i] + '\n';
							}
							
							msg.edit(newMessage);
						});
					
					message.delete();
				}
			}	
		}
	}
});
