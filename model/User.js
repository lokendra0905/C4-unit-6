const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true },
    gender: { type: 'string', required: true },
    password: { type: 'string', required: true },
}, {
    versionKey: false
})


const UserModel = mongoose.model('User', userSchema)

module.exports = { UserModel }