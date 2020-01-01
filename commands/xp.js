exports.run = (client, msg, args, con) => {
    if (args.length > 1) return msg.reply("too many arguments provided!");

    let target = msg.mentions.users.first() || msg.guild.members.get(args[0]) || msg.author;

    con.query(`SELECT * FROM xp WHERE id = '${target.id}' AND guild = '${msg.guild.id}'` , (err, rows) => {
        if (err) throw err;

        if (rows.length < 1) {
            msg.channel.send({embed: {
                title: `${target.tag} has 0 xp!`,
                color: 0x00ffff,
            }});
        } else {
            let xp = rows[0].amount;
            msg.channel.send({embed: {
                title: `${target.tag} has ${xp} xp!`,
                color: 0x00ffff,
            }});  
        }    
    });
};

const help = {
    cmdName: "xp",
    versionNumber: "2.6",
    syntax: "+xp [user]",
    description: "Checks the xp for a specified user.",
    examples: "+xp \n+xp @testbot#1000",
    notes: "If no user specified, checks own xp. \nXP is server specific."
};

exports.help = help;