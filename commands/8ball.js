sayings = [
    "As I see it, yes.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don’t count on it.",
    "It is certain.",
    "It is decidedly so.",
    "Most likely.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Outlook good.",
    "Reply hazy, try again.",
    "Signs point to yes.",
    "Very doubtful.",
    "Without a doubt.",
    "Yes.",
   "Yes – definitely.",
    "You may rely on it."
];

// introduced in version 2.7
exports.run = (client, msg, args, con) => {
    if (args.length == 0) return msg.reply("you need to ask something to get a response!");

    randomSaying = sayings[Math.floor(Math.random() * sayings.length)];

    msg.channel.send({embed: {
        color: 0x000099,
        title: `Shaking the 8ball... :8ball:`
    }}).then((msg) => {
        setTimeout(() => {
            msg.delete().then(msg => {
                msg.channel.send({embed: {
                    color: 3447003,
                    title: `:8ball: | ${randomSaying}`
                }});
            })
        }, 2000)
    });
};

const help = {
    cmdName: "8ball",
    versionNumber: "2.7",
    syntax: "+8ball [msg]",
    description: "Ask the mystical 8ball any question!",
    examples: "+8ball Will I pass my math test today?",
    notes: "N/A"
};

exports.help = help;