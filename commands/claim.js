exports.run = (client, msg, args, con) => {
    if (args.length > 1) return msg.reply("invalid arguments!");

    let target = msg.mentions.users.first() || msg.guild.members.get(args[0]) || msg.author;

    if (!client.currencyCooldown.has(msg.author.id)) {
        con.query(`SELECT * FROM atoms WHERE id = '${target.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;
            if (rows.length < 1) {
                sql = `INSERT INTO atoms (id, amount) VALUES ('${target.id}', 20)`;
                var money = 20;
            } else {
                var money = rows[0].amount;
                sql = `UPDATE atoms SET amount = ${money += 20} WHERE id = '${target.id}'`
            }

            con.query(sql);

            msg.channel.send({embed: {
                title: `ATOMS GOT!`,
                description: ` ${target.tag} now has ${money} atoms!`,
                color: 0x00ff00,
            }});

            client.currencyCooldown.add(msg.author.id);

            setTimeout(() => {
                client.currencyCooldown.delete(msg.author.id);
            }, 3600000);
        });
    } else {
        msg.channel.send({embed: {
            title: `You've already claimed your atoms for the hour! Check back in another hour.`,
            color: 0xff0000,
        }});
    };
};

const help = {
    cmdName: "claim",
    versionNumber: "3.0",
    syntax: "+claim [user]",
    description: "Adds atoms to the specified user's balance!",
    examples: "+claim \n+claim @testbot#1000",
    notes: " If user not specified, gives atoms to yourself. \nHas a one hour cooldown."
};

exports.help = help;