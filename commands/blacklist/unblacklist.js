const { MessageEmbed } = require('discord.js');
const db = require("./../../models/blacklist")
const {log,idroleban,banman} = require("./../../config.json")

module.exports = {
    name: "unblacklist",
    run: async(client, message, args) => {
          let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((m) => m.user.username === args.slice(1).join(" ")) 
      if(!message.member.roles.cache.has(banman)) if(!message.member.permissions.has("ADMINISTRATOR")) return;
        if(!member) return message.reply(`**رجاء كتابة ايدي او منشن العضو** | :x:`)
        const role1 = message.guild.roles.cache.get(idroleban)
        db.findOneAndDelete({user: member.id}, async(err,data) => {
            if(err) throw err
            if(data) {
                
                message.channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`**__تم فك القائمة السوداء من العضو __**`)
                        .setDescription(`**
                        اليوزر : <@${data.user}>
                        السبب : ${data.reason}
                        **
                        **__نتمنى منك عدم مخالفه القوانين وشكرا لك __**
                        `)
                        .setColor("GREEN")
                        .setFooter({text: message.guild.name, iconURL: message.guild.iconURL()})
                    ]
                })
            
                   member.roles.remove(role1);
          
                 const channel1 = message.client.channels.cache.get(log)  
                channel1.send({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`فك بلاك ليست : `)
                        .setDescription(`**
                        العضو : ${member}
                        الفاعل : ${message.author}
                        السبب : ${data.reason}
                        الوقت : <t:${Math.floor((Date.now() - 50000) / 1000)}:R>
                        **
                        `)
                        .setColor("AQUA")
                        
                    ]
                })
            } else {
                message.reply(`لم اجد الشخص | :x:`)
            }
        })
         const r = require("./../../models/role")
                   r.find({member: member.id }, async(err,data) => {
                        if(err) throw err;
                        if(data) {
                           data.forEach(r => {
                               member.roles.add(r.role).catch(() => 0)
                           })
                           await data.forEach(r => {
                               r.delete()
                           })
                            
                        } else {
                        console.log()
                        }
                    })
    }
}