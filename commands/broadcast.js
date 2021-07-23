module.exports = {
    name: 'anuncia',
    aliases: ['anunciar', 'bc'],
    description: 'Este comando anuncia el texto con @Everyone en el canal seleccionado',
    permissions: ['MANAGE_CHANNELS'],
    usage: 'rei anuncia <titulo> <descripcion> (imagen)',
    execute(client, message, args, Discord){
        let user = message.author;                      //guarda el id del usuario
        let nickname = message.author.username;         //guarda el apodo del usuario
        let avatar = user.avatarURL();                  //guarda el avatar del usuario

        const member = message.guild.member(user);
        const canal = args[0];

        let color = 'RANDOM';
        let titulo = args[1];
        let descripcion = args[2];
        let imagen = args[3];

        const newEmbed = new Discord.MessageEmbed()
        .setColor(color)
        //.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(titulo)
        .setDescription(descripcion)
        // .addFields(                                     //cuerpo
        //     {name: 'Campo 1', value: 'regla 1'},
        //     {name: 'Campo 2', value: 'regla 2'},
        //     {name: 'Campo 3', value: 'regla 3'},
        //     {name: 'Campo 4', value: 'regla 4'}
        // )
        .setImage(imagen)
        .setFooter(`Anuncio de ${nickname}`, message.author.displayAvatarURL({ dynamic: true }))   //mensaje de abajo

        client.channels.cache.get(canal).send(newEmbed);
        client.channels.cache.get(canal).send(`||@everyone perdon por el ping||`);
    }
}