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

This is used with [Discord.js](https://www.npmjs.com/package/discord.js).
