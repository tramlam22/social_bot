/* commands to get character's class job info*/

const Discord = require('discord.js');
const FFapi = require('../src/ff_api.js');
const User = require('../src/db/user.js');


module.exports = {
    name: 'classjobs',
    description: 'returns the classJobs the character has done and the levels',
    async execute(msg, args){

        try{

            if (args.length !== 3) { throw "wrong args"; }
            const server = args.shift();
            const usr = args.join(' ');
            let publicDir = require('path').join(__dirname,'..','/public/icons/');

            // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
            const profile = await User.findOne( { where: {name: usr, server: server} });
            if (!profile) { throw "error"; }

            const { Character } = await FFapi.getCharacter(profile.get('id'));
            const classJobs = Character.ClassJobs;

            /* loops through list of classes and returns the ones that have been played */
            let count = 0;
            for(let i = 0; i < classJobs.length; i++){
                let job = classJobs[i];
                if (job.Level !== 0){

                    const attachment = new Discord.MessageAttachment(publicDir + `${job["UnlockedState"].Name.toLowerCase().replace(/\s/g,'')}.png`);
                    const embedMSG = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${Character.Name}'s Class Jobs`)
                        .attachFiles(attachment)
                        .setThumbnail(`attachment://${job["UnlockedState"].Name.toLowerCase().replace(/\s/g,'')}.png`)
                        .addFields(
                            { name: "Class Job", value: `${job["UnlockedState"].Name}`, inline: true},
                            { name: "Level", value: `${job.Level}`, inline: true},
                        );
                    msg.reply(embedMSG);
                
                }
            }


        } catch(e) {
            console.error(e);
            if (e === "wrong args"){
                msg.reply('You do not have the correct amount of arguments\n !classjobs <server> <first name> <last name>')
            } else {
                msg.reply(`character not found.`);
            }
        }

    }
};