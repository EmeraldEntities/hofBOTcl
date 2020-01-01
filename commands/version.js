exports.run = (client, msg, args, con) => { 
    msg.channel.send({embed :{
        title: `Current version: v${client.config.version} | Date implemented: ${client.config.changeDate}`,
        description: `${client.config.changelog}`,
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: `Version number for ${client.user.tag} | `
        },
        color: 0xf4a460
    }})
};

const help = {
    cmdName: "version",
    versionNumber: "2.7.6",
    syntax: "+version",
    description: "Prints off the version number, and the changelog.",
    examples: "+version",
    notes: "N/A"
};

exports.help = help;