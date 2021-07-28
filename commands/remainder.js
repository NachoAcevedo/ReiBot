const ms = require('ms');

module.exports = {
    name: 'recordame',
    aliases: ['recorda'],
    description: 'Este comando crea un recordatorio por el tiempo definido en milisegundos por defecto',
    usage: 'rei recordame <recordatorio> <tiempo>',
    modifiers: 'Usa m para Minutos, h para Horas o d para Dias',
    permissions: [],
    execute(client, message, args) {
        const target = message.author;
        if (target) {

            let memberTarget = message.guild.members.cache.get(target.id);
            let recuerdoText = args.slice(0, -1).join(" ");

            var tiempo = args[args.length - 1];
            var alMenos = 300000; // define el tiempo minimo para los recordatorios

            if (!args[1]) {
                let frases = ['El comando deberia verse asi', 'Asi no es, proba con esto', 'Intentá con esto', 'Proba con esto']
                let asi_no = frases[Math.floor(Math.random() * frases.length)];
                message.channel.send(`${asi_no} <@${memberTarget.user.id}> \n \`${this.usage}\` \n\n ${this.modifiers}`);
                return
            } else if (ms(tiempo) < alMenos) { // verifica que 'tiempo' sea mayor a 5 minutos
                let frases = ['Al menos que sean', 'El recodatorio debe ser de al menos', 'No puedo hacer un recordatorio de menos de']
                let perdidaDeTiempo = frases[Math.floor(Math.random() * frases.length)];
                message.channel.send(perdidaDeTiempo + ' ' + ms(alMenos, {long: true}));
                return
            }

            try {
                var wordsOK = ['Dale', 'Ok', 'Bueno', 'Listo'];
                var wordOK = wordsOK[Math.floor(Math.random() * wordsOK.length)];
                message.channel.send(`${wordOK}, te recuerdo en ${ms(ms(tiempo))} de \`${recuerdoText}\` `);
            } catch (error) {
                message.channel.send(`No me dijiste en cuanto tiempo recordarte \n ${this.usage}`);
                return
            }

            setTimeout(function () {
                var wordsTime = ['Se cumplio el tiempo', 'Ya es hora', 'Se acabo el tiempo', 'Termino tu recordatorio'];
                var wordTime = wordsTime[Math.floor(Math.random() * wordsTime.length)];
                message.channel.send(`<@${memberTarget.user.id}> ${wordTime}! \n Me pediste que te recordara de \`${recuerdoText}\``);
            }, ms(tiempo));

        } else {
            message.channel.send('Upss... ocurrio un error');
        }
    }
}