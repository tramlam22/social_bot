/* returns a list of servers and data centers */

const Discord = require('discord.js');
const {servers} = require('../config.json');

module.exports = {
    name: 'servers',
    description: 'returns a list of the data centers and worlds',
    execute(msg, args){

        const embedMSG = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Data Centers and Servers`)
            .setThumbnail('https://cache-na.finalfantasy.com/assets/web/title/logo_ff14-d51f9f947abecc3cf9322518d4e9a860a7358a6dccf9439f50caea8443d7e133.png');

        const datacenters = Object.keys(servers);
        for (let i = 0; i < datacenters.length; i++){
            const dc = datacenters[i];
            const string = servers[dc].join(', ');
            embedMSG.addField(dc,string,false);
        }
        msg.reply(embedMSG);

    }
}