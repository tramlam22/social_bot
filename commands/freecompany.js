/* command to retrieve free company information */

const Discord = require('discord.js');
const FFapi = require('../src/ff_api.js');


module.exports = {
    name: 'freecompany',
    description: 'returns information about the free company that was entered',
    async execute(msg, args){

        try {
            if (args.length < 3) { throw "wrong args"; }
            const server = args.shift();
            const fc = args.join(' ');

            const res = await FFapi.getFreeCompany(fc, server);
            const data = res["FreeCompany"];
            const embedMSG = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${data.Name} Information`)
                .setThumbnail(`${data.Crest[0]}`)
                .setDescription(`${data.Slogan.trim()}`)
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Data Center', value: `${data.DC}`, inline: true },
                    { name: 'Server', value: `${data.Server}`, inline: true },
                    { name: 'Grand Company', value: `${data.GrandCompany}`, inline: true},
                    { name: 'Recruitment', value: `${data.Recruitment}`, inline: true},
                    { name: 'Member Count', value: `${data.ActiveMemberCount}`, inline: true},
                    { name: 'Tag', value: `${data.Tag}`, inline: true},
            )
            msg.reply(embedMSG);

        } catch(e) {
            console.error(e);
            if (e === "wrong args"){
                msg.reply('You do not have the correct amount of arguments\n !freecompany <server> <free company>')
            } else {
                msg.reply(`free company was not found.`);
            }
        }
    }
}