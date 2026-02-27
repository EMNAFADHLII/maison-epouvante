const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
email: {
type: String,
required: true,
unique: true,
lowercase: true,
trim: true,
},
password: {
type: String,
required: true,
},
firstname: {
type: String,
default: "",
trim: true,
},
lastname: {
type: String,
default: "",
trim: true,
},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
