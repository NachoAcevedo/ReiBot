module.exports = {
    name: 'anuncia',
    aliases: ['anunciar', 'bc'],
    description: 'Este comando anuncia el texto con @Everyone en el canal seleccionado',
    permissions: ['MANAGE_CHANNELS'],
    usage: 'rei anuncia <titulo> <descripcion>',
    execute(client, message, args, Discord){
        let user = message.author;                      //guarda el id del usuario
        let nickname = message.author.username;         //guarda el apodo del usuario
        let avatar = user.avatarURL();                  //guarda el avatar del usuario

        const member = message.guild.member(user);
        const canal = args[0];

        let titulo = args[1];
        let descripcion = args.slice(2).join(" ");

        const newEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(titulo)
        .setDescription(descripcion)
        // .setImage(imagen)
        .setFooter(`Anuncio de ${nickname}`, message.author.displayAvatarURL({ dynamic: true }))   //mensaje de abajo

        client.channels.cache.get(canal).send(newEmbed);
        client.channels.cache.get(canal).send(`||@everyone perdon por el ping||`);
    }
}