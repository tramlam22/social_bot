/* commands to return profile information */
const Discord = require('discord.js');
const FFapi = require('../src/ff_api.js');
const User = require('../src/db/user.js');

module.exports = {
    name: 'profile',
    description: 'returns the profile of the character name',
    async execute(msg, args){

        //const bot = msg.client;
        //const channel = bot.channels.cache.get('756590192751804506');

        try {
            if (args.length !== 3) { throw "wrong args"; }
            const server = args.shift();
            const usr = args.join(' ');

            // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
            const profile = await User.findOne( { where: {name: usr, server: server} });
            if (!profile) { throw "error"; }

            const {Character, FreeCompany} = await FFapi.getCharacter(profile.get('id'));
            const embedMSG = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${Character.Name}'s Profile`)
                .setThumbnail(`${Character.Avatar}`)
                .addFields(
                    { name: 'Server', value: `${server}`},
                    { name: 'Class Job', value: `${Character['ActiveClassJob']['UnlockedState'].Name}`},
                    { name: 'Free Company', value: `${FreeCompany.Name}`},
                )
                .setImage(`${Character.Portrait}`);
            msg.reply(embedMSG);
        
        } catch(e) {
            console.error(e);
            if (e === "wrong args"){
                msg.reply('You do not have the correct amount of arguments\n !profile <server> <first name> <last name>')
            } else {
                msg.reply(`character not found.`);
            }
        
        }
    }
}