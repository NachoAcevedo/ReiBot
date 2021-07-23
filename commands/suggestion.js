module.exports = {
    name: 'sugerir',
    aliases: ['sugerencia', 'y si'],
    description: 'crea una sugerencia y la envia al canal respectivo',
    permissions: [],
    execute(message, args, client, discord){
        const canal = 'sugerencias'
        const channel = message.guild.channels.cache.find(c => c.name === canal);
        if(!channel) return message.channel.send(`No existe un canal llamado ${canal}`);

        let messageArgs = args.join(' ');
        const embed = new discord.MessageEmbed()
        .setColor('FADF2E')
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