module.exports = {
    name: 'help',
    aliases: ['ayuda', 'como uso'],
    description: 'modulo de ayuda y guia de commands para Rei',
    usage: '<rei> help <comando>',
    permissions: [],
    execute(message, args, client, discord) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Aca hay una lista de todos mis comandos');
            data.push(commands.map(command => command.name).join('\n - '));
            data.push(`\nPodes enviar \`${prefix}ayuda <comando>\` para ver mas informacion del mismo`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Te mande un Md con todos mis comandos');
                })
                .catch(error => {
                    console.error(`No te pude enviar un Md ${message.author.tag}.\n`, error);
                    message.reply('Parece que tenes los Md desactivados, puede ser?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            var words = ['conozca', 'exista', 'este en mi libreria', 'pueda leer'];
            var word = wordsOK[Math.floor(Math.random() * words.length)];
            return message.reply(`Ese no es un comando que ${word}`);
        }

        data.push(`**Nombre: ** ${command.name}`);

        if (command.aliases) data.push(`**Aliases: ** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descripcion: ** ${command.description}`);
        if (command.usage) data.push(`**Uso: ** ${command.usage}`);
        if (command.permissions) data.push(`**Permisos: ** ${command.permissions}`)

        message.channel.send(data, { split: true });

    }
}