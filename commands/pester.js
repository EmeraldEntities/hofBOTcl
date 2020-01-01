exports.run = (client, msg, args, con) => {
    var memberTag = msg.mentions.members.first();
    if (memberTag !== undefined) {
        var member = memberTag.id;
    }

    if ((msg.guild.pesterUser && msg.author == msg.guild.originalUser) || (msg.guild.pesterUser && msg.author == client.config.ownerID)) {
        msg.channel.send("Pestering has been stopped. Gdday! :cowboy: ");
        msg.guild.pesterUser = false;
    
    } else if (msg.guild.pesterUser && msg.author != msg.guild.originalUser) {
        msg.channel.send("You cannot stop your own pestering!");
        
    } else if (member === client.user.id) {
        msg.channel.send("The bot reigns supreme. You cannot pester me.");

    } else {
        var message = "";
        var oUser = msg.author;
        if (!member) {
            return msg.reply("You must specify a user!");

        } else {
            let targetUser = member;
            if (Array.isArray(args.slice(1)) && args.slice(1).length) {
                message = args.slice(1).join(" ")
            } else {
                message = `you are being pestered by ${oUser}! Have funnn...`;
            }
            msg.channel.send(`Will now pester ${memberTag}! :smile:`);
            msg.guild.pesterUser = true;
            msg.guild.userToPester = targetUser;
            msg.guild.pesterMessage = message;
            msg.guild.originalUser = oUser;
        } 
    } 
}

const help = {
    cmdName: "pester",
    versionNumber: "1.4",
    syntax: "+pester [@person] [message]",
    description: "Pesters a specified user with the provided specified message.",
    examples: "+pester @testexample#1111 \n+pester @testexample#1112 hi there, it's me!",
    notes: "The bot owner can end any pester. \nLimited to one pester a server."
};

exports.help = help;