const { MessageEmbed } = require('discord.js');
const db = require("./../../models/blacklist")
const ms = require("ms")
const client = require("../../index")
const {log,idroleban,banman} = require("./../../config.json")
module.exports = {
    name: "blacklist",

    run: async(client, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((m) => m.user.username === args.slice(1).join(" ")) 
        let user = member
        const ar = message.content.split(' ').slice(2).join(" ")
        
if(!message.member.roles.cache.has(banman)) if(!message.member.permissions.has("ADMINISTRATOR")) return;
if(!member) return message.reply(`**رجاء كتابة ايدي او منشن العضو** | :x:`)

if(!ar[1]) return message.reply("**اكتب الوقت** | :x:")
const time = ms(args[1])

        if(!ar[2]) return message.reply(`**__اكتب السبب__** | :x:`)
        
      if (user.roles.highest.position >= message.guild.members.resolve(message.author).roles.highest.position ) return message.reply(`رتبك لاتسمح لي ان ابند هذا الشخص | :x:`)
      if (user.roles.highest.position >= message.guild.members.resolve(client.user).roles.highest.position ) return message.reply(`رتبي لاتسمح لي ان ابند هذا الشخص | :x:`)
       db.findOne({user: member.id , guildId: message.guild.id}, async(err,data) => {
           if(err) throw err ;
            if(data) {
            message.reply(`تم عثور الشخص لايمكنني ان خالفه مره اخرى | :x:`)
        } else {
              member.roles.cache.forEach((role) => { 
        member.roles.remove(role).catch(() => 0);
                    const channel = member.client.channels.cache.get(log)  
                  channel.send({
                     embeds: [
                         new MessageEmbed().setTitle(`remove role blacklist :`).setColor("AQUA").setDescription(`role : ${role}\n member : ${member}`)
                     ]
                  })
                  const role1 = require("./../../models/role")
                  role1.create({
                      member: member.id,
                      role: role.id
                  }).catch(() => 0)
      })
              const role1 = message.guild.roles.cache.get(idroleban)
             member.roles.add(role1)
             db.create({
                 user: member.id,
                 reason: ar,
                 time: time,
                 timeString: args[1],
                 guildId: message.guild.id
             }) 
             message.channel.send({
                 embeds: [
                     new MessageEmbed()
                     .setTitle("**تم وضع العضو في قائمه السوداء**")
                     .setDescription(`
                     **
                     بلاك ليست : ${member}
                     الفاعل للامر : ${message.author}
                     السبب : ${ar}
                     الوقت : ${args[1]}
                     تمت العمليه 
                     **
                     `)
                     .setColor("RED").setFooter({text: message.guild.name, iconURL: message.guild.iconURL()})
                     
                 ]
             })
                const channel1 = message.client.channels.cache.get(log)  
    channel1.send({
                 embeds: [
                     new MessageEmbed()
                     .setTitle("**اخر المستجدات (اضافه بلاك ليست)**")
                     .setDescription(`
                     **
                     بلاك ليست : ${member}
                     الفاعل للامر : ${message.author}
                     السبب : ${ar}
                     الوقت : ${args[1]}
                     **
                     `)
                     .setColor("RED").setFooter({text: "Arab Life | Cfw", iconURL: message.guild.iconURL()})
                     
                 ]
             })
   
        
        
        }
       })
       setTimeout(async() => {
        const role22 = require("./../../models/role")
        data = await db.findOneAndDelete({
            user: member.id
        })
        if(data) {
            da = await role22.find({member: data.user })
            const role1 = message.guild.roles.cache.get(idroleban)
            member.roles.remove(role1)
            
            if(da) {
                da.forEach(r => {
                    member.roles.add(r.role).catch(() => 0)
                })
                await da.forEach(r => {
                    r.delete()
                })
            }
        }
       }, time)
    }
}