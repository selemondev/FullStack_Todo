const mongoose = require("mongoose");
const goalSchema = mongoose.Schema({
    // to get the goals of each user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    text: {
        type: String,
        required: [ true, "Please add a goal"]
    },

    completed: {
        type: Boolean,
    }
}, 

{
    timestamps: true
});

module.exports = mongoose.model("Goals", goalSchema)
