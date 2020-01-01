exports.run = (client, msg, args, con) => {
    if (args.length > 1) return msg.reply("You're arguing too much while I'm trying to help you! :(");

    if (args[0] === undefined) {
        msg.channel.send({embed : {
            title: `Common commands for HOFbotCl! | V ${client.config.version}`,
            author: {
                name: `Helping ${msg.author.username}!`,
                icon_url: msg.author.avatarURL
            },
            color: 0xcd00cd,
            timestamp: new Date(),
            description: "Type `+help [command]` for more detailed help \nor type `+generalhelp` for a short description of often used commands!",
            footer: {
                icon_url: client.user.avatarURL,
                text: `Accuracy ensured by ${client.user.tag}| created by Joseph Wang | `
            },
            fields: [{
                name: "**Chat Commands**",
                value: "+yeehaw, +yeehawMode \n+pester"  
            },    
            {
                name: "**Currency Commands**",
                value: "+claim, +balance \n+leaderboard, +xp \n+donate" 
            },
            {
                name: "**Utility Commands**",
                value: "+pong, +uptime \n+destroy, +version"
            },
            {
                name: "**Moderation Commands**",
                value: "+kick, +purge"
            },
            {
                name: "**Useful Commands**",
                value: "+dice, +coinflip \n+coolquote, +8ball"
            },
            {
                name: "**Random Commands**",
                value: "+givemeattention, +hofbrincl \n+willrenaicome"
            }]
        }});
    } else {
        helpCmd = client.commands.get(args[0]);
        if (!helpCmd) return msg.reply("not a valid command!");

        helpResults = helpCmd.help;
        
        msg.channel.send({embed :{ 
            title: `Help for **${helpResults.cmdName}** command! | Introduced in V ${helpResults.versionNumber}`,
            author: {
                name: `Helping ${msg.author.username}!`,
                icon_url: msg.author.avatarURL
            },
            color: 0xe70074,
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: `Accuracy ensured by ${client.user.tag} | created by Joseph Wang | `
            },
            fields: [{
                name: `**${helpResults.syntax}**`,
                value: helpResults.description
            },
            {
                name: "Examples:",
                value: helpResults.examples
            },
            {
                name: "Additional notes:",
                value: helpResults.notes
            }]
        }});
    };
};
