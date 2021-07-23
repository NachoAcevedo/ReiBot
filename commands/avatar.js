module.exports = {
    name: 'avatar',
    aliases: [],
    description: 'Este comando devuelve el avatar del usuario mencionado, en caso de que no se haya mencinado a nadie, devuelve el avatar del autor',
    permissions: [],
    usage: 'rei avatar (usuario)',
    execute(client, message, args){
        let user = message.mentions.users.first() || message.author

        const member = message.guild.member(user);
        let avatar = user.avatarURL({size: 2048});

        message.channel.send(avatar);
    }
}