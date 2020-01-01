var attentionStatements = [
    "Hi there! I'm HOFbotCl!",
    "How ya doing?",
    "Bonjour, mes ami!",
    "Did you know HOFBrINCl is a super cool acronym?",
    "Yeehaw, pardner!"
];

exports.run = (client, msg, args, con) => {
    if (args.length > 0) return msg.channel.send("Sorry, I don't accept arguments while giving people attention.");

    let statement = attentionStatements[Math.floor(Math.random() * attentionStatements.length)];
    msg.author.send(statement);
};

const help = {
    cmdName: "givemeattention",
    versionNumber: "2.2.5",
    syntax: "+givemeattention",
    description: "Makes the bot DM you a nice message!",
    examples: "+givemeattention",
    notes: "N/A"
};

exports.help = help;