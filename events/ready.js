module.exports = (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}! User ID: ${client.user.toString()}`);
    console.log("Guilds:");

    client.guilds.forEach((guild) => {
        console.log(`- ${guild.name}`);
        
        guild.channels.forEach((channel) => {
            console.log(`-- ${channel.name}, ${channel.type} - ${channel.id}`);
        });
    });
    var currentTime = client.getCurrentTime();
    var confirmationChannelMessage = client.channels.get(client.config.confirmationChannel);

    confirmationChannelMessage.send(`${client.user.tag} has booted up! Time: **` + currentTime + `**`);

    client.user.setActivity(`with +, on ${client.guilds.size} servers`)
    client.user.setStatus('available')
};
