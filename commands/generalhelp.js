const generalHelp = function(client, msg) {
    msg.channel.send({embed :{ 
        title: `Help for general commands! | V ${client.config.version}`,
        author: {
            name: `Helping ${msg.author.username}!`,
            icon_url: msg.author.avatarURL
        },
        color: 0xcd00cd,
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: `Accuracy ensured by ${client.user.tag}| created by Joseph Wang | `
        },
        fields: [{
            name: "**+ping**",
            value: "Pong!"
        },
        {
            name: "**+uptime**",
            value: "Determines how long the bot's been up",
            inline: true
        },
        {
            name: "**+willrenaicome**",
            value: "Accurately determines if Renai will come to the next youth group!",
        },
        {
            name: "**+yeehaw**",
            value: "For your inner cowboy :cowboy:",
            inline: true
        },
        {
            name: "**+yeehawmode**",
            value: "Only for the true sherrifs of the west... :cowboy:",
        },
        {
            name: "**+pester [@person] [message]**",
            value: "Replies a message whenever a person talks, if no message provided, goes to default message.",
            inline: true
        },
        {
            name: "**+coolquote [person] ; [cool quote]**",
            value: "Sends a cool quote to the cool quote channel!",
        },
        {
            name: "**+givemeattention**",
            value: "Dms you a friendly message, and gives you their attention! :)",
            inline: true
        },
        {
            name: "**+dice [maxNumber] [numberOfDice]**",
            value: "Rolls a specified amount of dice!",
        },
        {
            name: "**+coinflip [numberOfCoins]**",
            value: "Throws a certain amount of coins away, but only after looking at the faces they land on!",
            inline: true
        },
        {
            name: "**+8ball [message]**",
            value: "Ask the mighty 8ball for assistance! :8ball:",
        }]
    }})
}             

const help = {
    cmdName: "generalHelp",
    versionNumber: "2.6.5",
    syntax: "+generalHelp",
    description: "Gives a general overview of common commands",
    examples: "+generalHelp",
    notes: "N/A"
};

exports.help = help;
exports.run = generalHelp;