const Discord = require('discord.js');
const bot = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const config = require('./settings.json');
const { loadCommands } = require('./utils/loadCommands');

const mongoose = require('mongoose');
mongoose.connect(config.MongoDB, { useNewUrlParser: true, useUnifiedTopology: true, })

require('./utils/loadEvents')(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Map()

loadCommands(bot);
bot.login(config.token);
