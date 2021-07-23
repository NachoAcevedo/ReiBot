module.exports = {
  // name: "ticket",
  // aliases: [],
  description: "Abre un canal con soporte",
  permissions: [],
  usage: 'rei ticket',
  async execute(message, args, client, discord) {
    const channel = await message.guild.channels.create(`ticket de ${message.author.tag}`); // crea un canal nuevo

    channel.setParent("867454148420173874"); // id de la categoria

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGE: false,
      VIEW_CHANNEL: false,
      ADD_REACTIONS: false,
    });
    channel.updateOverwrite(message.author, {
      SEND_MESSAGE: true,
      VIEW_CHANNEL: true,
    });

    const reactionMessage = await channel.send(new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('Bienvenido a Soporte')
      .setDescription(`<@${message.author.id}>\nPor favor indicans en que te 
      podemos ayudar, y en breve un Mod o Admin te dara una respuesta
      \n\n_pd. los emojis son solo para los Admins_`)
    );

    try {
      await reactionMessage.react("🔒");
      await reactionMessage.react("⛔");
    } catch (err) {
      channel.send("Hubo un error con los emojis");
      throw err;
    }

    const collector = reactionMessage.createReactionCollector(
      (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
      { dispose: true }
    );

    collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
        case "🔒":
          channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
          channel.send("El canal queda cerrado mientras tomamos una decisión");
          break;
        case "⛔":
          channel.send("Borrando el canal en 1m");
          setTimeout(() => channel.delete(), 1000 * 60); // 60s
          break;
      }
    });

    message.channel
      .send(`Segui las instrucciones en ${channel}`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 7000); // borra la respuesta despues de 7s
        setTimeout(() => message.delete(), 3000); // borra el comando despues de 3s
      })
      .catch((err) => {
        throw err;
      });
  },
};
