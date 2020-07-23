const Discord = require("discord.js");
const fs = require("fs");

client.login("TOKEN");

client.on("ready", async () => {

    console.log(`(✅)Bot on !`);

});


client.on("message", async message => {

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  let prefix = "PREFIX"

  if (!message.content.startsWith(prefix)) return;
  let commandfile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) commandfile.run(client, message, args);

});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  
  if (jsfile.length <= 0) {
    return console.log("[LOGS] Couldn't Find Commands !");
  }

  jsfile.forEach((f, i) => {

    console.log(`[📫] Command loaded ${f}`);

    let pull = require(`./commands/${f}`);
    client.commands.set(pull.config.name, pull);

    pull.config.aliases.forEach(alias => {

      client.aliases.set(alias, pull.config.name);
   
    });
  });
});
