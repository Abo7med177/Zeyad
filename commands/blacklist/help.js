

module.exports = {
    name: "help-blacklist",
    run: async(client, message, args) => {
        const {log,idroleban,banman,prefix,notenable} = require("./../../config.json")
        if(!message.member.roles.cache.get(banman)) if(!message.member.permissions.has("ADMINISTARTOR")) return;
        message.reply({
            content: `
            \`\`\`
            blacklist
            \`\`\`
**- prefix : ${prefix}
- blacklist , ex : blacklist <@!919177836605108264> [time] [reason]
- blacklist-log 
- unblacklist , ex : unblacklist <@!919177836605108264>
__ settings __
- Log : <#${log}>
- ban manger : <@&${banman}>
- role ban : <@&${idroleban}>
- role not enable : <@&${notenable}>
**
            `
        })
    }
}