var express = require('express')
var jade = require('jade')
var mongoose = require('mongoose')
var _ = require('underscore')
var Material = require('./models/material')
var fs = require('fs')

var path = require('path')
var bodyParser = require('body-parser')


var app = express()
var port = process.env.PORT||3000
app.locals.moment = require('moment')

mongoose.connect('mongodb://localhost/material')
app.set('views','./views/pages')
app.set('view engine','jade')

app.use(express.static(path.join(__dirname,'public/')))
app.locals.resoucePath = "/img";

app.use(bodyParser())



console.log('start')

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

//detail
app.get('/material/:id',function(req,res){
	var id = req.params.id
	
	Material.findById(id, function(err,material){
		if(err){
			console.log(err)
		}
		res.render('detail',{
			title:'Material_lib 详情页',
			material:material
			})		
	})

})

//admin
app.get('/admin/new',function(req,res){
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

//admin post material
app.post('/admin/material/new', function(req,res){
	var materialObj = req.body.material
	var id = materialObj._id
	var _material
	
	if(id !='undefined'){
		Material.findById(id,function(err,material){
			if(err){
				console.log(err)
			}
			
			_material = _.extend(material,materialObj)
			_material.save(function(err,material){
				if(err){
					console.log(err)
				}
				res.redirect('/material/'+ material._id)
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


//delete
// 逻辑控制:删除
app.delete('/admin/list/delete', function (req, res) {
    var id = req.query.id;

    if (id) {
        Material.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            }else{
            	res.json({success: true})
            }
			
        });
    }
});

////图片路由
//app.get('/img/:name',function(req,res){
//	var name = req.params.name
//	if(name){
//		res.redirect('/admin/')
//	}
//})

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

app.listen(port)