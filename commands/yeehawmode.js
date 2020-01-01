exports.run = (client, msg, args, con) => {   // Controls yeehaw mode™, requested by Annie H!
    if (Array.isArray(args) && args.length > 0) return msg.reply("yeehaw mode™ takes no arguments... for you cannot argue with yeehaw mode™.");
    
    if (msg.guild.yeehawOn) {
        msg.guild.yeehawOn = false;
        msg.channel.send("Yeehaw mode™ has been forcefully shut off... sad yeehaw.");
    } else {
        msg.channel.send("Yeehaw mode™ is now on! :cowboy:");
        msg.guild.yeehawOn = true;
    }
}

const help = {
    cmdName: "yeehawmode",
    versionNumber: "1.7",
    syntax: "+yeehawmode",
    description: "Engages yeehaw mode, where the bot will respond with a saying and add a cowboy reaction to any message sent.",
    examples: "+yeehawmode",
    notes: "Only for the true cowboys..."
};

exports.help = help;