exports.run = (client, msg, args, con) => {
    if (msg.member.hasPermission('KICK_MEMBERS')) {
        let target = msg.mentions.members.first() || msg.guild.members.get(args[0]);
        if (!target) return msg.reply("cannot find that user!");

        reason = args.slice(1).join(" ") || "No reason specified.";

        if (target.hasPermission("MANAGE_MESSAGES")) return msg.reply("cannot kick that person!");

        target.kick(reason).then(() => {
            msg.reply(`User has been successfully kicked! For reason: "${reason}"`)
        }).catch(err => {
            msg.reply("Insufficant bot permissions!");
            console.error(err);
        });

    } else {
        msg.reply(`Insufficant perms! You cannot kick anyone!`);
    }
}

const help = {
    cmdName: "kick",
    versionNumber: "2.8",
    syntax: "+kick [user] [reason]",
    description: "Boots the user out of the server for a specified reason.",
    examples: "+kick Testbot#1000 Bad bot \n+kick Testbot#1001",
    notes: "You must have the perm **'Kick Members'** to use this command!\nNOTE: untested, try at own risk."
};

exports.help = help;