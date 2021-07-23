const ms = require('ms');

module.exports = {
    // name: 'recordame',
    // aliases: ['recorda'],
    description: 'Este comando crea un recordatorio por el tiempo definido en milisegundos (por defecto), o se puede usar s para Segundos, m para Minutos, h para Horas o d para Dias',
    usage: 'rei recordame <recordatorio> <tiempo>',
    permissions: [],
    execute(client, message, args) {
        const target = message.author;
        if (target) {

            let memberTarget = message.guild.members.cache.get(target.id);
            let recuerdoText = args.slice(0, 1).join(" ");

            if (!args[1]) {
                message.channel.send(`El comando deberia verse asi <@${memberTarget.user.id}>\n \`${this.usage}\`\n\n_ps. por el momento <recordatorio> tiene que ser de 1 palabra_`);
                return
            }

            var tiempo = args.length(-1);

            var wordsOK = ['Dale', 'Ok', 'Bueno', 'Listo'];
            var wordOK = wordsOK[Math.floor(Math.random() * wordsOK.length)];
            message.channel.send(`${wordOK}, te recuerdo en ${ms(ms(tiempo))} de ${recuerdoText}`);

            setTimeout(function () {
                var wordsTime = ['Se cumplio el tiempo', 'Ya es hora', 'Se acabo el tiempo', 'Termino tu recordatorio'];
                var wordTime = wordsTime[Math.floor(Math.random() * wordsTime.length)];
                message.channel.send(`<@${memberTarget.user.id}> ${wordTime}!\nMe pediste que te recordara de ${recuerdoText}`);
            }, ms(args[tiempo]));

        } else {
            message.channel.send('Upss... ocurrio un error');
        }
    }
}