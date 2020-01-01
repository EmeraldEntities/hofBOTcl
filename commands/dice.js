exports.run = (client, msg, args, con) => {
    try {
        if (args.length > 2) return msg.reply("Too many arguments! I control the dice here, not you!");
        if (args[0] < 0 || args[1] < 0) return msg.reply("you can't roll negative integers!");
        if (!(args[0] === undefined || Number.isInteger(parseInt(args[0]))) || !(args[1] === undefined || Number.isInteger(parseInt(args[1])))) return msg.reply("invalid arguments!");

        var rollNum = args[0] || 6
        var diceStr = "You rolled a"

        if (args[1] == undefined) {
            var numDice = 1;
            var throwDice = "throwing a die... :game_die:";
        } else {
            if (args[1] > 100) return msg.reply("are you trying to get me to run out of memory?");
            
            var numDice = args[1]
            var throwDice = "throwing your dice... :game_die:";
            diceStr = "You rolled: ";
        }

        var diceNums = []
        for (dNum = 0; dNum < numDice; dNum++) {
            let diceRoll = client.generateRandomInteger(1, rollNum);

            diceNums.push(diceRoll);
        };

        diceNums.forEach((die) => {
            diceStr = diceStr + " **" + die.toString() + "**,";             
        })

        diceStr = diceStr.slice(0, diceStr.length - 1);

        msg.reply(throwDice).then((msg) => {        
            let diceResult = setTimeout(() => {
                msg.edit(diceStr + "!")
            }, 2000);
        });
    } catch(er) {console.error(er)}
};

const help = {
    cmdName: "dice",
    versionNumber: "2.3",
    syntax: "+dice [numOfFaces] [numOfDice]",
    description: "Rolls a specified amount of dice with a specified amount of sides.",
    examples: "+dice \n+dice 10\n+dice 8 6",
    notes: "Default number of faces is 6, default number of dice is 1.\nWill not accept strings or negative numbers as arguments. \nFloats are converted to strings, parsed into an integer and have their decimal points truncated."
};

exports.help = help;