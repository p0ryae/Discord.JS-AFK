const afk = require('../models/afk');

module.exports.run = async (bot, message, args) => {
  if (message.mentions.roles.first()) {
    return message.channel.send("**CAN'T PING ROLES**");
  }

  const data = await afk.findOne({
    UserID: message.author.id
  });

  if (!data) {
    const reason = args.slice(0).join(' ') || 'No Reason';
    message.channel.send(`**${message.author.username}**, You are now **AFK**. Reason: **${reason}**`);
    const newAfk = new afk({
      UserID: message.author.id,
      Reason: reason,
    });
    newAfk.save();
  } else if (data) {
    await afk.deleteOne({
      UserID: message.author.id
    });
    message.channel.send(`${message.author.username}, welcome back! I removed your AFK.`);
  }
}

module.exports.config = {
  name: "afk",
  aliases: []
}
