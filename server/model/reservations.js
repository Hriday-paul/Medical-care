const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reserveSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        testId: {
            type: mongoose.ObjectId,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        blood: {
            type: String,
            enum: ['AB+', 'AB-', 'A+', 'B+', 'A-', 'B-', 'O+', 'O-']
        },
        phone: {
            type: String,
            required: true
        },
        bookedDate: {
            type: String,
            required: true
        },
        report: {
            type: String,
            required: true,
            enum: ['pending', 'complete', 'cencel']
        },
    }
);

module.exports = reservations= mongoose.model("reservations", reserveSchema);