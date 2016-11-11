var Category = require('../models/category.js')

var _ = require('underscore')
//detail
// exports.detail = function(req,res){
// 	var id = req.params.id
	
// 	Material.findById(id, function(err,material){
// 		Comment
// 			.find({material: id})
// 			.populate('from','name')
// 			.populate('reply.from reply.to', 'name')
// 			.exec(function(err,comments){
// 				// console.log(comments)
// 				res.render('detail',{
// 					title:'Material_lib 详情页',
// 					material:material,
// 					comments:comments
// 				})	

// 		})

// 	})

// }

//admin
exports.new = function(req,res){
	res.render('category_admin',{
		title:'Material_lib 后台分类录入页',
		category: {}
	})
}


//admin post material
exports.save = function(req,res){
	var _category = req.body.category
	var category = new Category(_category)
	category.save(function(err,category){
		if(err){
			console.log(err)
		}
		res.redirect('/admin/category/list')
	})

	
}

//list
exports.list = function(req,res){
	Category.fetch(function(err,categories){
		if(err){
			console.log(err)
		}
		res.render('categorylist',{
			title:'Material_lib 分类列表页',
			categories:categories
		})
	})	

}


// //delete
// // 逻辑控制:删除
// exports.del =  function (req, res) {
//     var id = req.query.id;

//     if (id) {
//         Material.remove({_id: id}, function (err, movie) {
//             if (err) {
//                 console.log(err);
//             }else{
//             	res.json({success: true})
//             }
			
//         });
//     }
// }

