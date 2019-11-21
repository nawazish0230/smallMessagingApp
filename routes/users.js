const mongoose = require('mongoose');
const plm  =require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/chutput');

let userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    messages: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);