var mongoos = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
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

userSchema.methods.generateAuth = function(){
	var user = this;
	var access = "auth";
	var token = jwt.sign({_id:user._id.toHexString(),access},process.env.JWT_SECRET).toString();
	user.tokens.push({access,token});
	return user.save().then(()=>{
		return token;
	})
};

userSchema.pre('save',function(next){
	var user = this;
	console.log(user);
	if(user.isModified('password')){
		console.log(user)
 bcrypt.genSalt(10,(err,salt)=>{
 	bcrypt.hash(user.password,salt,(err,hash)=>{
 		user.password = hash;
 		next();
 	})
 })		
	}else{
		next();
	}
})
var user = mongoos.model('user',userSchema);

module.exports =  function(){ 
	return {
		user : user
	}
};