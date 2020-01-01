exports.run = (client, msg, args, con) => {
    if (msg.author == client.config.ownerID) {
        if (!args || args.size < 1) return msg.reply("Must include command to reload!");
        if (args.size > 1) return msg.reply("Too many arguments!");
        const cmdName = args[0]
        if(!client.commands.has(cmdName)) return msg.reply("Invalid command to reload!");

        delete require.cache[require.resolve(`./${cmdName}.js`)]; // Destroy the old cached command that's stored in this folder
        client.commands.delete(cmdName); // Delete the actual command
        const props =  require(`./${cmdName}.js`);
        client.commands.set(cmdName, props); // Reset the command
        msg.reply(`command ${cmdName} has been successfully reloaded!`);
    }
}

const help = {
    cmdName: "reload",
    versionNumber: "2.1",
    syntax: "+reload [command]",
    description: "Reloads a certain command, and clears the old command from the cache.",
    examples: "+reload ping",
    notes: "Only the bot owner can use this command."
};

exports.help = help;