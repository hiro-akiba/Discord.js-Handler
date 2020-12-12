# Discord.js-Handler
Here is a short example to convert your bot to handler.

Simply download the code and place your files in the folder `commands`.

And then you have to modify your commands like this :

```js
const fs = require("fs");
const Discord = require('discord.js')

module.exports.run = async (client, message) => {

//script

}
module.exports.config = {
    name: "NAME", //name
    aliases: ["ALIASES"] //aliases
}
```

Be noted that in : 

```js
name: "NAME", //name
aliases: ["ALIASES"] //aliases
```
The name of the command cannot contain spaces, replace the spaces with `-` or other.

This is used with [discord.js](https://www.npmjs.com/package/discord.js).


# index.js
```js

// When ever a message
// Let's take for example `!SAY something` as a message.content ^^
client.on("message", async message => {
// So that the bot doesn't respond to itself
// And DMs
if(message.author.bot || message.channel.type === "dm") return;

  let messageArray = message.content.split(" "); // Ex : ["!SAY","something"]
  let cmd = messageArray[0].toLowerCase(); // Ex : "!say"
  let args = messageArray.slice(1); // Ex : ["something"]
  let prefix = "!" // You can change it

// We make sure this is our prefix.
  if (!message.content.startsWith(prefix)) return;
  
  // here we check if one of our commands match the given command
  let commandfile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    // There is, then we run the imported function
  if (commandfile) commandfile.run(client, message, args);

});
```

## Now that we told our bot what to do when a message is emited. We have to create the commandes from the files

```js
// We create a collection
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// With fs ("file system") we will read all the files in the commands folder.
fs.readdir("./commands/", (err, files) => {
// We make sure we only use the javascript files
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  // If there is no files in the folder
  if (jsfile.length <= 0) return console.log("[LOGS] Couldn't Find Commands !");

// Now that we have the files, let's setup the commands ^^
  jsfile.forEach((f, i) => {
// We log that the command just got read
    console.log(`[📫] Command loaded ${f}`);
    
// We take all the informations on the file and set on the collection we made earlier
    let pull = require(`./commands/${f}`);
    client.commands.set(pull.config.name, pull)
    
// And the same thinf for aliases
    pull.config.aliases.forEach(alias => {
      client.aliases.set(alias, pull.config.name);
  
    });
  });
});
