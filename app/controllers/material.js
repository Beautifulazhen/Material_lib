var Material = require('../models/material')
var Comment = require('../models/comment.js')
var Category = require('../models/category.js')
var _ = require('underscore')
//detail
exports.detail = function(req,res){
	var id = req.params.id

	Material.update({_id: id}, {$inc: {pv: 1}}, function(err){
		if(err){
			console.log(err)
		}
	})
	
	Material.findById(id, function(err,material){
		Comment
			.find({material: id})
			.populate('from','name')
			.populate('reply.from reply.to', 'name')
			.exec(function(err,comments){
				// console.log(comments)
				res.render('detail',{
					title:'Material_lib 详情页',
					material:material,
					comments:comments
				})	

		})

	})

}

//admin
exports.new = function(req,res){
	Category.find({}, function(err,categories){
		res.render('admin', {
			title: 'Material_lib 后台录入页',
			categories: categories,
			material: {}
		})
	})
}
//admin update material
//点更新时跳到录入页并初始化数据显示
exports.update = function(req,res){
	var id = req.params.id
	if(id){
		Material.findById(id,function(err,material){
			Category.find({}, function(err, categories){
					res.render('admin',{
					title:'后台更新页',
					material:material,
					categories: categories
				})
			})

		})
	}
}

//admin post material
exports.save = function(req,res){
	var materialObj = req.body.material
	var id = materialObj._id
	var _material
	
	if(id){
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
		_material = new Material(materialObj)
		var categoryId = materialObj.category
		var categoryName = materialObj.categoryName

		_material.save(function(err, material){
			if(err){
				console.log(err)
			}

			if(categoryId){
				Category.findById(categoryId,function(err, category){
					
					
					category.materials.push(material._id)

					category.save(function(err, category){
						res.redirect('/material/'+material._id)
					})
				})				
			}else if(categoryName){
				var category = new Category({
					name: categoryName,
					materials: [material_id]
				})

				category.save(function(err, category){
					material.category = category._id
					material.save(function(err, material){
						res.redirect('/material/'+material._id)
					})
				})
			}	
		})
	}
}

//list
exports.list = function(req,res){
	Material.fetch(function(err,materials){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'Material_lib 列表页',
			materials:materials
		})
	})	

}


//delete
// 逻辑控制:删除
exports.del =  function (req, res) {
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
}

