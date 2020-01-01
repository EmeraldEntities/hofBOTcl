var coinValues = [0.05, 0.10, 0.25, 1.00, 2.00];

exports.run = (client, msg, args, con) => {
    if (args.length > 1) return msg.reply("the coin economy cannot be swayed with your many arguments!");
    if (args[0] < 0) return msg.reply("you can't flip a negative amount of coins! The laws of quantum mechanics forbids this!");
    if (!(args[0] === undefined || Number.isInteger(parseInt(args[0])))) return msg.reply("invalid arguments!");

    if (args[0] == undefined) {
        var amountToFlip = 1;
        var coinMessage = "Your coin landed on";
    } else {
        if (args[0] > 100) return msg.reply("I can't allow you to fling that many coins.");
        var amountToFlip = args[0];
        var coinMessage = "Your coin(s) landed on";
    };

    var allCoinFaces = [];
    var totalCoinCost = 0.00;

    for (coin = 0; coin < amountToFlip; coin++) {
        let result = client.generateRandomInteger(0, 1);
        totalCoinCost = totalCoinCost + coinValues[Math.floor(Math.random() * coinValues.length)];

        if (result == 0) {
            allCoinFaces.push("heads");
        } else {
            allCoinFaces.push("tails");
        };
    };

    coinFaceMessage = ""
    allCoinFaces.forEach((face) => {
        coinFaceMessage = coinFaceMessage + "**" + face.toString() + "**, "
    })

    msg.reply("throwing change... :moneybag:").then((msg) => {
        let coinTimer = setTimeout(() => {
            msg.edit(`${coinMessage} ${coinFaceMessage.slice(0, coinFaceMessage.length-2)}!`).then((msg) => {
                msg.channel.send(`You lost $${totalCoinCost.toFixed(2)}!`)
            })
        }, 2000);
   });
}

const help = {
    cmdName: "coinflip",
    versionNumber: "2.4",
    syntax: "+coinflip [numOfCoins]",
    description: "Throws a specified amount of coins and looks at the faces that it landed on.",
    examples: "+coinflip \n+coinflip 5",
    notes: "Will not accept strings or negative numbers as arguments. \nFloats are converted to strings, parsed into an integer and have their decimal points truncated."
};

exports.help = help;