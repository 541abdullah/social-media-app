let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userdataschema = new Schema({
    username: {
        type: String,
        required: true
    },
    following: {
        type: Array,
        required: true
    },
    followers: {
        type: Array,
        required: true
    },
    story: {
        type: Boolean,
        required: true,

    },
    storycontent: {
        type: Array,
        required: true
    },
    storyseen: {
        type: Array,
        required: true
    },
    storydel: {
        type: Array,
        required: true
    },
    storylikes: {
        type: Array,
        required: true
    },
    pendingfollowreqs: {
        type: Array
    },
    blocklist: {
        type: Array
    },
    postsnum: {
        type: Number
    }


}, { timestamps: true })

let Userdata = mongoose.model('Userdata', userdataschema);



module.exports = Userdata;