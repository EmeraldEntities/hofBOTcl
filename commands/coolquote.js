exports.run = (client, msg, args, con) => {
    if (args[0] === undefined || args[1] === undefined) return msg.reply("you need to specify a person and a message!");
    try {
        let semicolonArea = args.findIndex((item) => {
            return item === ";";
        });

        var person = args.slice(0, semicolonArea).join(" ");
        var message = args.slice(semicolonArea + 1).join(" ");

        var coolQuoteChannel = client.channels.get(client.config.coolQuotesChannel);
        
        coolQuoteChannel.send({embed : {
            /*
            author: {
                name: `Submitted by ${msg.author.username}!`,
                icon_url: msg.author.avatarURL
            },
            */
            title: `"${message.toString()}"`,
            description: `- ${person.toString()} 2019`,
            color: 3447003
        }});

        msg.reply("cool quote has been sent!");
    } catch(error) {
        console.error(error);
    }
};

const help = {
    cmdName: "coolquote",
    versionNumber: "2.2",
    syntax: "+coolquote [person] ; [cool quote message]",
    description: "Makes a coolquote for a person and puts an embedded message in the cool quote channel!",
    examples: "+coolquote Joseph ; Narch",
    notes: "Do not do `+coolquote Joseph; Narch` or `+coolquote Joseph ;Narch`!"
};

exports.help = help;