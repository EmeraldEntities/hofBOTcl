exports.run = (client, msg, args, con) => {
    return msg.channel.send(`${client.user.tag} has been running for ${client.uptime/1000} seconds with 0 errors so far!`);
};

const help = {
    cmdName: "uptime",
    versionNumber: "1.3",
    syntax: "+uptime",
    description: "Checks how long the bot has been online for, in seconds...",
    examples: "+uptime",
    notes: "It's in seconds, so you can tell how confident I am in my programming skills..."
};

exports.help = help;