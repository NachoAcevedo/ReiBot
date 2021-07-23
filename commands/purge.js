module.exports = {
    name: 'purga',
    aliases: ['elimina', 'borra'],
    description: 'Este comando elimina la cantidad de mensajes indicados, siempre y cuando sea mayor a 1 o menor a 100 (limites de discord)',
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
    usage: 'rei purga <cantidad_de_mensajes>',
    execute(client, message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return
        if (isNaN(args[0])) return message.channel.send("No me dijiste cuantos mensajes borrar")
        if (args[0] > 100) return message.channel.send("Tiene que ser un numero menor a 100")
        if (args[0] < 1) return message.channel.send("Al menos tiene que ser 1")

        message.delete()
        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`Borre los mensajes.`)).then(d => d.delete({ timeout: 10000 }))
            .catch(() => message.channel.send("Ups, algo salio mal"))
    }
}
