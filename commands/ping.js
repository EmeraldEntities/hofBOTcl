exports.run = (client, msg, args, con) => {
    msg.reply(`uwu. you've summoned the ping machine, which says: **${client.ping.toFixed(3)}** ms`).catch(console.error);
};

const help = {
    cmdName: "pong",
    versionNumber: "1.0",
    syntax: "+ping",
    description: "Pings the bot, making it respond and list the response time.",
    examples: "+ping",
    notes: "N/A"
};

exports.help = help;