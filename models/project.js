'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    avatar: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('project', ProjectSchema);