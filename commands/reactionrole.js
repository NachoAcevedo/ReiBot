// const Discord = require('discord.js');

const { Channel } = require("discord.js");

module.exports = {
    name: 'reactionrole',
    aliases: ['rr', 'roles de reaccion', 'reaccion rol', 'rol reaccion'],
    description: 'Crea un embed al que al reaccionar te otorga un rol a eleccion, soporta 2 roles',
    usage: 'rei rr <id_del_canal> <titulo> <descripcion> <emoji_1> <rol_1> <emoji_2> <rol_2>',
    permissions: ['MANAGE_CHANNELS'],
    async execute(client, message, args, Discord) {
        {
            const canal = args[0];
            const role_1 = message.guild.roles.cache.find(role => role.name === args[4]);
            const role_2 = message.guild.roles.cache.find(role => role.name === args[6]);

            const emoji_1 = args[3];
            const emoji_2 = args[5];

            let embed = new Discord.MessageEmbed()
                .setColor('#e42643')
                .setTitle(args[1])
                .setDescription(
                    `${args[2]}\n\n ${emoji_1} para ${role_1}\n ${emoji_2} para ${role_2}`);

            let messageEmbed = await client.channels.cache.get(canal).send(embed); // message.channel.send(embed);
            messageEmbed.react(emoji_1);
            messageEmbed.react(emoji_2);

            if(!args[6]) {
                return message.channel.send(`La forma correcta de usar el comando seria \n \`${this.usage}\``) //falta que el codigo se termine aca
            }

            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == canal) {
                    if (reaction.emoji.name === emoji_1) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(role_1);
                    }
                    if (reaction.emoji.name === emoji_2) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(role_2);
                    }
                } else {
                    return;
                }

            });

            client.on('messageReactionRemove', async (reaction, user) => {

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;


                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === emoji_1) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(role_1);
                    }
                    if (reaction.emoji.name === emoji_2) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(role_2);
                    }
                } else {
                    return;
                }
            });
        }

    }
}