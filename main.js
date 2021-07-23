const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

    // Falta:       reminder with message, nickname, soundboard, selfrole, antispam, ghost channel, help, twitter
    // WIP:         broadcast (embed), help, reactionroles, 
    // Arreglar:    welcome message/autorole, member counter, status, ticket
    // Listo:       purge, avatar, mute/unmute, reminder with 1 word, unknown command, 

client.login(process.env.DISCORD_TOKEN); // tiene que ser la ultim linea