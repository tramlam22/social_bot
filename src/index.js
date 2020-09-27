const Discord = require('discord.js');
const {prefix, token} = require('../config.json');
const fs = require('fs');
const path = require('path');

/* creates new discord client/bot */
const bot = new Discord.Client();

/* import commands from commands folder*/
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(path.resolve(path.join(__dirname,'..'), './commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`../commands/${file}`);
    bot.commands.set(command.name, command);
}


/* logs into discord w/ app's token
    event trigger once when bot is online */
bot.login(token);
bot.on('ready', async () => {

    console.info(`Logged in as ${bot.user.tag}!`);
    //bot.channels.cache.get('756590192751804506').send('Hello here!');

});

bot.on('message', async (msg) => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(command);

    if (!bot.commands.has(command)) {
        msg.reply('invalid command enter "!help" for help.')
        return;
    }
    try {
        await bot.commands.get(command).execute(msg, args);
    } catch (e) {
        console.error(e);
        msg.reply('There was an error trying to execute that command!')
    }

});


