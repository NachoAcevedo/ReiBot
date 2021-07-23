module.exports = {
    name: 'unmute',
    aliases: ['desilencia', 'desmutea'],
    description: 'Este comando desmutea al usuario seleccionado',
    permissions: ["ADMINISTRATOR", "MUTE_MEMBERS"],
    execute(client, message, args) {
        if (!message.member.hasPermission("MUTE_MEMBER") || !message.member.hasPermission("ADMINISTRATOR")) return
        const target = message.mentions.users.first();
        if (target) {
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Mute'); //encuentra el rol mencinado

            let memberTarget = message.guild.members.cache.get(target.id);

                memberTarget.roles.remove(muteRole);
                message.channel.send(`<@${memberTarget.user.id}> ya podes volver a hablar con normalidad`);

        } else {
            message.channel.send('Perdon, pero no puede encontrar a ese Usuario');
        }
    }
}