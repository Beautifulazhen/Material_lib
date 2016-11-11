var Index = require("../app/controllers/index.js")
var User = require("../app/controllers/user.js")
var Material = require("../app/controllers/material.js")
var Comment = require("../app/controllers/comment.js")
var Category = require("../app/controllers/category.js")

module.exports = function(app){

//pre handle user
app.use(function(req,res,next){
	var _user = req.session.user

	
	app.locals.user = _user
	

	next()
})

//index
app.get('/', Index.index)

//signup
app.post('/user/signup',User.signup)

//userlist
app.get('/admin/userlist',User.signinRequired, User.adminRequired, User.userlist)


//signin
app.post('/user/signin',User.signin)

app.get('/signin', User.showSignin)
app.get('/signup', User.showSignup)

//logout
app.get('/logout', User.logout)
//detail
app.get('/material/:id',Material.detail)

//admin
app.get('/admin/material/new', User.signinRequired, User.adminRequired, Material.new)

//admin update material
//点更新时跳到录入页并初始化数据显示
app.get('/admin/material/update/:id', User.signinRequired, User.adminRequired, Material.update)

//admin post material
app.post('/admin/material/new', User.signinRequired, User.adminRequired, Material.save)

//list
app.get('/admin/material/list', User.signinRequired, User.adminRequired, Material.list)


//delete
// 逻辑控制:删除
app.delete('/admin/list/delete', User.signinRequired, User.adminRequired, Material.del);


//comment
app.post('/user/comment', User.signinRequired, Comment.save)



//category
app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)

app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)

//results
app.get('/results', Index.search)
}