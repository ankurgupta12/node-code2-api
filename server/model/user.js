var mongoos = require('mongoose');
var jwt = require('jsonwebtoken');
var userSchema = new mongoos.Schema({
	email:{
type:String,
required:true,
minlength:1,
unique:true,
trim:true
	},
	password:{
		type:String,
		required:true,
		minlength:6
	},
tokens:[{
	access:{
		type:String,
		required:true
	},
	token:{
		type:String,
		required:true
	}
}]
});

userSchema.method.generateAuth = function(){
	var user = this;
	var access = "auth";
	var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
	user.tokens.push({access,token});
	return user.save().then(()=>{
		return token;
	})
};
var user = mongoos.model('user',userSchema);

module.exports = mongoos.model('user',userSchema);