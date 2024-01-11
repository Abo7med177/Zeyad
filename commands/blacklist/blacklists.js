const { MessageEmbed } = require('discord.js');
const db = require("./../../models/blacklist")
const {log,banman} = require("./../../config.json")
module.exports = {
    name: "blacklist-log",
  cooldown: 15,
    run: async(client, message, args) => {
      if(!message.member.roles.cache.has(banman)) if(!message.member.permissions.has("ADMINISTRATOR")) return;
        const data = await db.find({guildId: message.guild.id})
       if (!data?.length) return message.reply(`لاتوجد قائمه شوداء | :x:`)
        const embed = data.map((data) => {
            const user =  message.guild.members.cache.get(data.user)
            return [
                `الشخص : ${user}`,
                `الوقت : ${data.timeString}`,
                `سبب المخالفه : ${data.reason}`
            ].join("\n");
        }).join("\n\n");
        const em = new MessageEmbed()
        .setTitle(`**__جميع المخالفين في السيرفر__**`).setDescription(embed).setThumbnail(message.guild.iconURL()) .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true })).setColor("DARK_BUT_NOT_BLACK")
         message.channel.send({
             embeds: [em]
         })
         const channel1 = message.client.channels.cache.get(log)  
                channel1.send({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`مستجدات بلاك ليست : `)
                        .setDescription(`**
                        الفاعل : ${message.author}
                        السبب : استخدام امر القائمة السوداء
                        الوقت : <t:${Math.floor((Date.now() - 50000) / 1000)}:R>
                        **
                        `)
                        .setColor("AQUA")
                        
                    ]
                })
    }
}
    