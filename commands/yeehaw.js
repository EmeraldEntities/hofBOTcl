exports.run = (client, msg, args, con) => {
    msg.channel.send("Yeehaw! :cowboy:");

    let interval = setInterval(() => {
        msg.channel.send("Yeehaw! :cowboy:");
    }, 2000);

    let clearTimeout = setTimeout(() => {
        clearInterval(interval);
    }, 10000);
};

const help = {
    cmdName: "yeehaw",
    versionNumber: "1.6",
    syntax: "+yeehaw",
    description: "Makes the bot yeehaw!",
    examples: "+yeehaw",
    notes: "N/A"
};

exports.help = help;