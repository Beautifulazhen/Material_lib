var mongoose = require('mongoose')

var MaterialSchema = require('../schemas/material')
var Material = mongoose.model('Material',MaterialSchema)

module.exports = Material
