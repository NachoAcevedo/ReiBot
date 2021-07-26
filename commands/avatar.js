module.exports = {
    name: 'avatar',
    aliases: [],
    description: 'Este comando devuelve el avatar del usuario mencionado, en caso de que no se haya mencinado a nadie, devuelve el del autor',
    permissions: [],
    usage: 'rei avatar (usuario)',
    execute(client, message, args) {
        let user = message.mentions.users.first() || message.author

        const member = message.guild.member(user);
        let avatar = user.avatarURL({ size: 2048 });

        if (args.length >= 2) {
            message.channel.send(`Solo puedo enviar el avatar de 1 usuario a la vez`);
        }
        message.channel.send(avatar);
    }
}