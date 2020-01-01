exports.run = (client, msg, args, con) => {
    if (args.length > 0) return msg.reply("you're sending too many arguments!");

    let random = client.generateRandomInteger(0, 5);

    msg.channel.send({embed : {
        color: 3447003,
        title: "Consulting the stars... :sparkles:",
        description: "Doing some magical hoodwinklie to check... ",
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: `Accuracy ensured by ${client.user.tag} | `
        }
    }});
    if (random == 0) {
        let int = setTimeout(() => {
            msg.channel.send({embed: {
                color: 0x00ff00,
                title: "Renai **WILL** come to the next youth group!",
            }});
        }, 5000);
    } else {
        let int = setTimeout(() => {
            msg.channel.send({embed: {
                color: 0xff0000,
                title: "Sadly, Renai will **NOT** come to the next youth group. :(",
            }});
        }, 5000);
    };
};

const help = {
    cmdName: "willrenaicome",
    versionNumber: "1.2",
    syntax: "+willrenaicome",
    description: "Consults with the stars and the universe to determine if Renai will come.",
    examples: "+willrenaicome",
    notes: "N/A"
};

exports.help = help;