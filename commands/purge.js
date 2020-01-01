exports.run = (client, msg, args, con) => {
    if (args.length > 2) return msg.reply("the purge only accepts a certain amount of arguments. Any more will be lost.");
    if (msg.member.hasPermission('MANAGE_MESSAGES')) {
        let user = msg.mentions.users.first() || msg.guild.members.get(args[0]);
        let amount = (parseInt(msg.content.split(" ")[1])) ? parseInt(msg.content.split(" ")[1]) : parseInt(msg.content.split(" ")[2])

        if (!amount) return msg.reply("you need to specify an amount!");
        if (amount > 100) return msg.reply("the purge can only fit up to 100 targets!");

        msg.channel.fetchMessages({
            limit: amount + 1
        }).then((messages) => {
            if (user) {
                let filterTarget = user.id;
                messages = messages.filter(m => m.author.id === filterTarget).array().slice(0, amount);
            }
            msg.channel.bulkDelete(messages).then(() => {
                msg.delete();
            }).catch(err => console.error(err));
        });
    };
};

const help = {
    cmdName: "purge",
    versionNumber: "2.9",
    syntax: "+purge [user] [amount]",
    description: "Purges a specific amount of messages from a specified user. If no user, purges everyone's message",
    examples: "+purge @testbot#1000 30 \n+purge 100",
    notes: "You must have the perm **'Manage messages'** to use this command!\nYou can only purge up to 100 messages at a time!"
};

exports.help = help;