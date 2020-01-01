exports.run = (client, msg, args, con) => {
    if (args.size > 1) {
        return msg.reply("you're sending too many arguments!");
    } else if (args[0] == "m") {
        return msg.channel.send("I'm a representation of Diego coal gremlin loli cupcake egg cantalope HOFBrINCl");
    } else {
        return msg.channel.send("HOFBrINCl - Hydrogen, Oxygen, Fluorine, Bromine, Iodine, Nitrogen, and Chlorine - The diatomic molecules!");
    }
};

const help = {
    cmdName: "hofbrincl",
    versionNumber: "1.1.5",
    syntax: "+hofbrincl",
    description: "Defines what HOFBrINCl means.",
    examples: "+hofbrincl",
    notes: "N/A"
};

exports.help = help;