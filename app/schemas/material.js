var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var MaterialSchema = new Schema({
	title:String,
	description:String,
	src:String,
	local:String,
	img:String,
	category: {
		type: ObjectId,
		ref: 'Category'
	},
	pv: {
		type: Number,
		default: 0
	},	
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

MaterialSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next()
})

MaterialSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = MaterialSchema