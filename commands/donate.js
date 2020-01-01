exports.run = (client, msg, args, con) => {
    var target = msg.mentions.users.first() || msg.guild.members.get(args[0]);
    var amount = parseInt(args[1]);
    var shouldAddAtoms = true;

    if (!target) return msg.reply("you need to specify a user to donate to, or I'll toss it all away!");
    if (!amount) return msg.reply("you need to specify an amount to transfer, buddy!");

    con.query(`SELECT * FROM atoms WHERE id = ${msg.author.id}`, (err, rows) => {
        if (err) throw err;
        let sql;
        var money;

        if (rows.length < 1) {
            shouldAddAtoms = false;
            msg.reply("you don't have any atoms! If you want to create one, please do +claim for your first atoms!")
        
        } else if (amount > rows[0].amount) {
            shouldAddAtoms = false;
            msg.channel.send(({embed: {
                title: `TRANSFER FAILED.`,
                description: "You don't have that many atoms to give away!",
                color: 0xff0000,
            }}));
        
        } else {
            money = rows[0].amount;
            sql = `UPDATE atoms SET amount = ${money -= amount} WHERE id = '${msg.author.id}'`;

            con.query(sql);
        }

        if (shouldAddAtoms) {
            con.query(`SELECT * FROM atoms WHERE id = ${target.id}`, (err, rows) => {
                if (err) throw err;
                let sql;
                var tMoney;
                
                if (rows.length < 1) {
                    sql = `INSERT INTO atoms (id, amount) VALUES ('${target.id}', ${amount})`;
                } else {
                    tMoney = rows[0].amount;
                    sql = `UPDATE atoms SET amount = ${tMoney += amount} WHERE id = '${target.id}'`;
                }

                con.query(sql);

                msg.channel.send({embed : {
                    title: `TRANSFER SUCCEEDED!`,
                    description: `${target.tag} now has ${tMoney} atoms!`,
                    color: 0x00ff00,
                }});
            });
        };
    });
};

const help = {
    cmdName: "donate",
    versionNumber: "3.0",
    syntax: "+donate [player] [amount]",
    description: "Gives the specified player a certain amount of atoms.",
    examples: "+donate @testbot#1000 200",
    notes: "This is called an ionic bond, or something like that."
};

exports.help = help;