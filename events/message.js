const xpCooldown = new Set();

var yeehawSayings = [
    "yeehaw, pardner! :cowboy:",
    "howdy! :cowboy:",
    ":cowboy:",
    "whatra doin here, pardner? :cowboy:",
    "yeehaw! :cowboy:",
    "yeehaw! Giddy-up, pardner! :cowboy:",
    "welcome to the wild west, pardner! :cowboy:",
    "you're my favourite deputy! :cowboy:",
    "there aint enough room for both of us here, pardner. :cowboy:"
]

module.exports = async (client, con, msg) => {
    if (!(msg.channel.type == "dm")) {
        console.log(`Guild: ${msg.guild.name}- #${msg.channel.name}: ${msg.member.user.tag}: ${msg}`);

        if (!xpCooldown.has(msg.author.id + msg.guild.id)) {
            if (!msg.author.bot) {
                con.query(`SELECT * FROM xp WHERE id = '${msg.author.id}' AND guild = '${msg.guild.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;
                    if (rows.length < 1) {
                        sql = `INSERT INTO xp (id, amount, guild) VALUES ('${msg.author.id}', ${client.generateXP()}, '${msg.guild.id}')`;
                    } else {
                        let xp = rows[0].amount;
                        sql = `UPDATE xp SET amount = ${xp + client.generateXP()} WHERE id = '${msg.author.id}' AND guild = '${msg.guild.id}'`
                    };

                    con.query(sql);
                });
                xpCooldown.add(msg.author.id + msg.guild.id);

                setTimeout(()=> {
                    xpCooldown.delete(msg.author.id + msg.guild.id);
                }, 5000);
            };
        };

        if (msg.author == client.user){
            return
        };
        if (msg.content.startsWith(client.config.prefix)){
            processCommand(client, msg, con);
        };
        if (msg.content.includes("hofbrincl")) {
            msg.channel.send("it's actually HOFbotCl, thank you very much");
        };
        if (msg.content.includes("good hofbotcl")) {
            msg.channel.send(":blush:");
        };
        /*
        if (msg.content.includes("renee") || msg.content.includes("Renee")) {
            msg.channel.send("did you mean: **Renai**?");
        }
        */
        if (msg.content.includes(client.user.toString())) {
            msg.channel.send("hi yes im HOFbotCl");
        };
        if (msg.guild.pesterUser === true) {
            if (msg.author.id == msg.guild.userToPester) {
                msg.reply(msg.guild.pesterMessage);
            };
        };
        if (msg.guild.yeehawOn) {
            msg.react("🤠");
            msg.channel.send(yeehawSayings[Math.floor(Math.random() * yeehawSayings.length)]);
        };
    } else {
        console.log(`HOFbotCl's DMs: ${msg.author.tag}: ${msg}`);
    }
};

function processCommand(client, msg, con) {
    let args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g); // The arguments, with prefix and whitespace sliced off and regex in
    let mainCommand = args.shift().toLowerCase(); // The main command, shift removes the first element of the list

    cmd = client.commands.get(mainCommand);
    if (!cmd) return msg.reply("not a valid command!");

    cmd.run(client, msg, args, con);
};