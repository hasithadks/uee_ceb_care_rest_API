const  mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const UserAccountSchema = new Schema({
    email: {type: String},
    name : {type:String},
    nic : {type: String},
    phoneNo : {type: String},
    userName : {type: String},
    password : {type: String}



});

const productList = mongoose.model('productList', UserAccountSchema);

module.exports = productList;
