var Material = require('../models/material')
var Category = require('../models/category')
//index
exports.index = function(req,res){
	
	Category
		.find({})
		.populate({path: 'materials', options: {limit:5}})
		.exec(function(err,categories){
			if(err){
				console.log(err)
			}
		

			res.render('index',{
				title:'Material_lib 首页',
				categories:categories
			})		
	})

}


exports.search = function(req,res){
	var catId = req.query.cat
	var page = parseInt(req.query.p,10)
	var qu = req.query.q
	var count = 2
	var index = page * count
	var num


	if(catId){
		Category.find({_id: catId})
				.exec(function(err, b){
					console.log(b[0])
					if(err){
						console.log(err)
					}
					num = b[0].materials.length
					console.log(num)
				})

		Category
			.find({_id: catId})
			.populate({path: 'materials', options: {limit:count, skip:index}})
			.exec(function(err,categories){
				if(err){
					console.log(err)
				}
				var category = categories[0] || {}
				
				res.render('results',{
					title:'Material_lib 结果列表页面',
					keyword: category.name,
					results: category.materials,
					totalPage: Math.ceil(num/2),
					currentPage: (page+1),
					query: 'cat='+catId
				})		
			})		
		}else{
			Material.find({title: new RegExp(qu+'.*', 'i')})
					.exec(function(err, result){
						if(err){
							console.log(err)
						}
						
						res.render('results', {
							title: '结果列表页',
							keyword:  qu,
							currentPage: (page+1),
							query: 'q='+qu,
							totalPage: 1,
							results: result
						})
					})
		}


}
