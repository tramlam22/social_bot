/* returns a list of servers and data centers */

const Discord = require('discord.js');
const User = require('../src/db/user.js');
const FFapi = require('../src/ff_api.js');
const { UniqueConstraintError } = require('sequelize');

module.exports = {
    name: 'save',
    description: 'logs charater into database',
    async execute(msg, args){

        try {

            if (args.length !== 3) { throw "wrong args"; }
            const server = args.shift();
            const usr = args.join(' ');

            const data = await FFapi.getCharacterID(usr, server);
            const profile = await User.create({
                id: data["Results"][0].ID,
                name: usr,
                server: server,
            });
            //User.add(usr, server, data["Results"][0].ID);
            return msg.reply(`${profile.name} profile added.`)

        } catch (e) {
            console.info(e);
            if (e === "wrong args"){
                msg.reply('You do not have the correct amount of arguments\n !save <server> <first name> <last name>')
            } else if (e instanceof UniqueConstraintError) {
                msg.reply('character profile has already been added.')
            } else {
                msg.reply(`character does not exist.`);
            }
        }

    }
}