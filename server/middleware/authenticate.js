var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/todoApp", { native_parser: true });
db.bind('users');
var jwt = require('jsonwebtoken');
var authenticate = (req,res,next)=>{
	var token = req.header('authorization');
		console.log(token);
		var decode = jwt.verify(token,'abc123');
		console.log(decode);
		db.users.findOne({token:decode.token},function(err,result){
if(!result){
				return res.status(401).send('no found');

			}
			req.result = result;
			req.token = token;
			next();
		// res.end('MehdiFilban');

		});
}
module.exports = {authenticate};