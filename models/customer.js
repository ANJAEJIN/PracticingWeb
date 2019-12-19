var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    id: Number,
    image: String,
    name: String,
    birthday: String,
    gender: String,
    job: String,
    isDeleted: Number,
    createdDate: Date 
});

module.exports = mongoose.model('customer', customerSchema);