const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        slot: {
            type: Number,
            required: true,
        },
        testDate: {
            type: Number,
            required: true,
        },
        photo : {
            type : String,
            required: true,
        },
        details : {
            type : String,
            required : true
        }
    }
);

module.exports = tests = mongoose.model("tests", testSchema);