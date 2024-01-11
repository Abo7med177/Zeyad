const client = require("../index");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
const schema = require("./../models/blacklist");
const { log, notenable, idroleban } = require("./../config.json")
client.on("guildMemberAdd", async(member) =>{
    const db = schema.findOne({user: member.id}, async(err,data) => {
        if(err) throw err;
        if(data) {
             const channel = member.client.channels.cache.get(log)  
            channel.send(`
            طالع وداخل 
            ${member}
   
                        `)
           //  member.roles.cache.forEach((role) => { 
        //member.roles.remove(role).catch(() => 0);
      //})
             const role2 = member.guild.roles.cache.get(notenable)
                     member.roles.remove(role2)
              const role1 = member.guild.roles.cache.get("1161669190319603914")
             member.roles.add(role1)
             
        } else {
            console.log()
            
        }
    })
})
