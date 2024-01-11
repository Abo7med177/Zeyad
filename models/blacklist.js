const { Schema, model } = require("mongoose");
module.exports = model("blacklist", new Schema({
user: String,
    reason: String,
    time: Number,
    timeString: String,
    guildId: String
})
                      )