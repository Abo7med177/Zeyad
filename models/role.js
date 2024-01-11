const { model, Schema } = require("mongoose");
module.exports = model("role", new Schema({
    role: String,
    member: String
}))