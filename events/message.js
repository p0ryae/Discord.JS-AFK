const afk = require('../models/afk');

module.exports = async (bot, message) => {
  if (message.author.bot) return;

  const messageArray = message.content.split(' ');
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  // ----------  AFK STUFF  ----------
  const mentioned = message.mentions.members.first();
  if (mentioned) {
    const data = await afk.findOne({
      UserID: mentioned.id,
    });

    if (data) {
      message.channel.send(`**${mentioned.user.username}** is currently AFK. Reason: **${data.Reason}**`);
    }
  }

  const mainData = await afk.findOne({
    UserID: message.author.id,
  });

  if (mainData) {
    message.channel.send(`**Welcome back!** I removed your AFK **${message.author.username}**.`);
    mainData.deleteOne({
      UserID: message.author.id,
    });
  }
  // ----------  AFK STUFF  ----------

  const prefix = '?';

  if (message.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))) return message.channel.send(`${message.guild.name}'s Prefix is \`${prefix}\`\n\nTo get a list of commands, say \`${prefix}help\``);

  if (!message.content.startsWith(prefix)) return;
  const commandfile = bot.commands.get(cmd.slice(prefix.length).toString().toLowerCase()) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length).toString().toLowerCase()));;
  if (commandfile) {
    commandfile.run(bot, message, args);
  }
}
