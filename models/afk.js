const mongoose = require('mongoose');

const AFKSchema = new mongoose.Schema({
	UserID: String,
	Reason: String
});

const MessageModel = module.exports = mongoose.model('AfkTEST', AFKSchema);
