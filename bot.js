const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');
const mysql = require('mysql');
const config = require('./config.json');

const client = new Discord.Client();
client.config = config;                 // Making sure that client has a copy of config so that everyone can access it

const currencyCooldown = new Set()
client.currencyCooldown = currencyCooldown;
///////////////////////////////
// LOAD IN FILES
///////////////////////////////

fs.readdir('./events/', (err, files) => {  // Get all the events
    if (err) return console.error(err);

    files.forEach(file => {
        if (!file.endsWith(".js")) return; // If it's not js, ignore it
        const eventHandler = require(`./events/${file}`); // Load the file itself
        let eventName = file.split(".")[0]; // Get just the file name
        client.on(eventName, eventHandler.bind(null, client, con)); // Every event will be called with the client argument and the con argument, plus its own
        delete require.cache[require.resolve(`./events/${file}`)]
    })
})

client.commands = new Enmap(); // Creates a new enmap and stores it into commands under client

fs.readdir('./commands/', (err, files) => {  // Load all the commands
    if (err) return console.error(err);

    files.forEach(file => {
        if (!file.endsWith(".js")) return; // If it's not js, ignore
        let props = require(`./commands/${file}`) // Loads the file itself
        let commandName = file.split(".")[0]; // Get the command name

        console.log(`Attempting to load in command ${commandName}...`);
        client.commands.set(commandName, props); // Sets the command into place (Allows other modules to call it)
    });
});

// Sets up a connection to the sql database to a variable named con
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: client.config.password,
    database: "hofbotbase"
}); 

// Ensures that we can actually connect to the database, and connects to it
con.connect(err => {
    if (err) throw err;
    console.log("Connected to database!");
    con.query("SHOW TABLES", console.log);
});

const _KAT_ID = "<@551631010903621682>";
const _JAC_ID = "<@320787871122587649>";

/*   Experimental, but welcomes users
client.on('guildMemberAdd', (user) => {
    welcomeChannel.send(welcomeMessage).catch(error =>{
        user.channel.send("Error! Did you set a welcome channel?")
        loggerChannel = client.channels.get("559249411054764032");
        loggerChannel.send(`An attempt was made to try to welcome a user, but failed.` )
    })
});
*/

///////////////////////////////
// FUNCTIONS
///////////////////////////////

const getCurrentTime = function() {
    let date = new Date();
    let hours = date.getHours();
    hours = (hours < 10 ? "0" : "") + hours ;
    let minutes = date.getMinutes();
    minutes = (minutes < 10 ? "0" : "") + minutes;
    let seconds = date.getSeconds();
    seconds = (seconds < 10 ? "0" : "") + seconds;

    return hours + ": " + minutes + ": " + seconds;
};

const generateRandomInteger = function(min, max) {
    min = Math.ceil(min) // Get the greatest integer greater or equal to min
    max = Math.floor(max) // Get the smallest integer greater or equal to max
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min // Min = inclusive, max = also inclusive

    return randomNum
};

const generateXP = function() {
    return Math.floor(Math.random() * (15 - 5 + 1)) + 5
};

client.getCurrentTime = getCurrentTime;
client.generateRandomInteger = generateRandomInteger;
client.generateXP = generateXP;

client.login(config.token);