const ms = require('ms');
module.exports = {
    name: 'mute',
    aliases: ['silencia', 'mutea'],
    description: 'Este comando mutea al usuario seleccionado por el tiempo definido en milisegundos por defecto, se puede usar s para Segundos, m para Minutos, h para Horas o d para Dias',
    permissions: ["ADMINISTRATOR", "MUTE_MEMBER"],
    usage: 'rei silencia <@usuario> (tiempo)',
    execute(client, message, args) {
        if (!message.member.hasPermission("MUTE_MEMBER") || !message.member.hasPermission("ADMINISTRATOR")) return
        const target = message.mentions.users.first();
        if (target) {
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Mute'); //encuentra el rol mencinado

            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]){
                memberTarget.roles.add(muteRole);
                message.channel.send(`<@${memberTarget.user.id}> fue Silenciado hasta que algun Mod lo revierta`);
                return
            }
                memberTarget.roles.add(muteRole);
                message.channel.send(`<@${memberTarget.user.id}> fue Silenciado por ${ms(ms(args[1]))}`);

                setTimeout(function() {
                    memberTarget.roles.remove(muteRole);
                    message.channel.send(`<@${memberTarget.user.id}> ya podes volver a hablar con normalidad`);
                }, ms(args[1]));

        } else {
            message.channel.send('Perdon, pero no puede encontrar a ese Usuario');
        }
    }
}