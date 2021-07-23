module.exports = {
    // name: 'sugerir',
    // aliases: ['sugerencia', 'y si'],
    description: 'crea una sugerencia y la envia al canal respectivo',
    usage: 'rei sugerir <sugerencia>', 
    permissions: [],
    execute(message, args, client, discord, cmd){
        const nombreCanal = 'sugerencias' // busca un canal con este nombre
        const canal = message.guild.channels.cache.find(c => c.name === nombreCanal);
        if(!canal) return message.channel.send(`No existe un canal llamado ${nombreCanal}`);

        let messageArgs = args.join(' ');
        const embed = new discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs);

        channel.send(embed).then((msg) =>{
            msg.react('✔');
            msg.react('❌');
            message.delete();
        }).catch((err)=>{
            throw err;
        });
    }
}