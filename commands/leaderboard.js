exports.run = (client, msg, args, con) => {
    if (args.length != 1) return msg.reply("invalid arguments! The only leaderboards available are the ones for xp and atoms!");

    let mode = args[0];
    if (mode != "xp" && mode != "atoms") return msg.reply("invalid leaderboard to look at!")

    con.query(`SELECT * FROM ${mode} ORDER BY amount DESC, id`, (err, rows) => {
        if (err) throw err;
        
        let newRows;
        
        if (mode === "xp") {
            newRows = rows.filter(row => (msg.guild.members.get(row.id) != undefined && row.id != client.user.id && row.guild == msg.guild.id));
        } else {
            newRows = rows.filter(row => (msg.guild.members.get(row.id) != undefined && row.id != client.user.id));
        };
        let alteredRows = (newRows.length > 8) ? newRows.slice(0, 8) : newRows;
        let message = ""
        alteredRows.forEach(row => {
            let member = msg.guild.members.get(row.id);
            message = message + `${member.user.tag} : **${row.amount} ${mode}** \n\n`
        });

        msg.channel.send({embed: {
            title: `Showing leaderboards for ${mode}:`,
            description: message,
            color: 0x8a2be2,
            author: {
                name: `Leaderboards for ${msg.guild.name}!`,
                icon_url: msg.guild.iconURL
            },
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: `Accuracy ensured by ${client.user.tag}! |  `
            },
        }})  
    });
};

const help = {
    cmdName: "leaderboard",
    versionNumber: "3.0",
    syntax: "+leaderboard [xp/atoms]",
    description: "Returns and shows the top 8 in the specified branch.",
    examples: "+leaderboard xp \n+leaderboard atoms",
    notes: "If there are less than 8 members found, returns the total amount of people found."
};

exports.help = help;