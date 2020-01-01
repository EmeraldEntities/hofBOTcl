exports.run = (client, msg, args, con) => {
    if (args.length > 1) return msg.reply("invalid arguments!");

    var target = msg.mentions.users.first() || msg.guild.members.get(args[0]) || msg.author;
    con.query(`SELECT * FROM atoms WHERE id = '${target.id}'`, (err, rows) => {
        if (err) throw err;
        var money = 0;
        if (rows.length > 0) {
            money = rows[0].amount;
        }
        
        msg.channel.send({embed: {
            title: `${target.tag} has ${money} atoms!`,
            color: 0x00ffff,
        }});
    });
};

const help = {
    cmdName: "balance",
    versionNumber: "3.0",
    syntax: "+balance [user]",
    description: "Checks the specified user's balance!",
    examples: "+balance \n+balance @testbot#1000",
    notes: " If user not specified, checks your own balance. \nAtoms are global."
};

exports.help = help;
