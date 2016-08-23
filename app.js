var express = require('express')
var jade = require('jade')
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var Material = require('./models/material')
var _ = require('underscore')
var app = express()
app.locals.moment = require('moment')

var port = process.env.PORT||3000
app.listen(port)

console.log('start')

mongoose.connect('mongodb://localhost/material')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(express.static(path.join(__dirname,'public/')))

app.use(bodyParser())




//路由
//index
app.get('/',function(req,res){
	Material.fetch(function(err,materials){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title:'Material_lib 首页',
			materials:materials
		})		
	})

})

//list
app.get('/admin/list',function(req,res){
	Material.fetch(function(err,materials){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'Material_lib 列表页',
			materials:materials
		})
	})	

})

//admin
app.get('/admin/material',function(req,res){
	res.render('admin',{
		title:'Material_lib 后台录入页',
		material:{
			title:'',
			description:'',
			src:'',
			img:''
			
		}
	})
})

//admin post material
app.post('/admin/material/new',function(req,res){
	var id = req.body.material._id
	var materialObj = req.body.material
	var _material
	if(id!='undefined'){
		Material.findById(id,function(err,material){
			if(err){
				console.log(err)
			}
			
			_material = _.extend(material,materialObj)
			_material.save(function(err,material){
				if(err){
					console.log(err)
				}
				res.redirect('/material/'+material._id)
			})
		})
	}else{
		_material = new Material({
			title:materialObj.title,
			description:materialObj.description,
			src:materialObj.src,
			img:materialObj.img
		})
		_material.save(function(err,material){
			if(err){
				console.log(err)
			}
			res.redirect('/material/'+material._id)	
		})
	}
})
//admin update material
//点更新时跳到录入页并初始化数据显示
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id
	if(id){
		Material.findById(id,function(err,material){
			res.render('admin',{
				title:'后台更新页',
				material:material
			})
		})
	}
})
//detail
app.get('/material/:id',function(req,res){
	var id = req.params.id
	Material.findById(id, function(err,material){
	res.render('detail',{
		title:'Material_lib '+material.title,
		material:material
		})		
	})

})

//delete
app.delete('/admin/list',function(res,req){
	var id = req.query.id
	
	if(id){
		Material.remove({_id:id},function(err,material){
			if(err){
				console.log(err)
			}else{
				res.json({success:1})
			}
		})
	}
})
