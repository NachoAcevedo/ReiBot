module.exports = async (client) => {
    const guild = client.guilds.cache.get('866742809024528391'); // id del servidor

        setInterval(() => {
            const memberCount = guild.memberCount;
            const channel = guild.channels.cache.get('866742809725501482') // id del canal
            channel.setName(`👥 Miembros: ${memberCount.toLocaleString()}`)
            console.log('update')
        }, 5000) // cambia el nombre del canal cada 10m
}