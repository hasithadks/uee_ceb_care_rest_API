const  mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const productListSchema = new Schema({
    device: {type: String},
    qty : {type:String},
    hours : {type: String},
    power : {type: String},
    kDay : {type: String}

});

const userAccount = mongoose.model('userAccount', productListSchema);

module.exports = userAccount;
