const Discord = require("discord.js");
const fs = require("fs");
const config = require('./config.json')
const prefix = config.prefix;
const bot = new Discord.Client({disableMentions:'everyone'});
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});
bot.on('ready',()=>{
    require('./events/client/ready')(bot)
})
bot.on('message',async message=>{
    require('./events/guild/message')(bot,message)
})
const token = require(`./token.json`)
bot.login(token.Token)