let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');


let userdetschema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    fullname: {
        type: String,
        required: true
    },
    profpic: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    gender: {
        type: String
    },
    acctype: {
        type: String
    },
    notifscreated: {
        type: Array
    },
    postscommented: {
        type: Array
    },
    postsliked: {
        type: Array
    },
    followreqsent: {
        type: Array
    }


}, { timestamps: true });




userdetschema.pre('save', async function (next) {

    let salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next();
});



userdetschema.statics.login = async function (username, password) {

    const result = await this.findOne({ username });
    if (result != null) {
        const ispass = await bcrypt.compare(password, result.password);
        if (ispass) {
            return result;
        }
        else {
            throw new Error('wrong password')
        }
    }
    else {
        throw new Error('wrong username')
    }

}

let Userdetail = mongoose.model('Userdetail', userdetschema);


module.exports = Userdetail;