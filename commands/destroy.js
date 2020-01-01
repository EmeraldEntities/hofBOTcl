exports.run = (client, msg, args, con) => {
    if (msg.author == client.config.ownerID) {
        msg.channel.send("Shutting down...");
        var confirmationChannelMessage = client.channels.get(client.config.confirmationChannel);
        confirmationChannelMessage.send(`${client.user.tag} is now shutting down... beep boop... Uptime: ${client.uptime/1000} seconds`);
        client.destroy();
    } else {
        msg.reply("HOFbotCl is too powerful for you to shut down...")
    }
};

const help = {
    cmdName: "destroy",
    versionNumber: "1.5",
    syntax: "+destroy",
    description: "Logs the bot out",
    examples: "+destroy",
    notes: "Only the bot owner can use this command successfully."
};

exports.help = help;