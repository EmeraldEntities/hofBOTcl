exports.run = (client, msg, args, con) => {
    if (msg.author == client.config.ownerID) {
        let text = args.join(" ");

        msg.delete().catch(err => {
            console.error(err);
        });

        msg.channel.send(text) ;
    }
};

const help = {
    cmdName: "say",
    versionNumber: "2.0.5",
    syntax: "+say [message]",
    description: "Makes the bot say something.",
    examples: "+say hi there!",
    notes: "Why are you trying to make the bot say something? Only the owner can use this!"
};

exports.help = help;