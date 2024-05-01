const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        status: {
            type: String,
        },
        photo : {
            type : String
        },
        role : {
            type : String,
            enum : ['user', 'admin'],
            default : 'user'
        }
    }
);

module.exports = users = mongoose.model("users", userSchema);