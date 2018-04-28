var mongoos = require('mongoose');
var todo = mongoos.model('todo',{
	text:{
type:String,
required:true,
minlength:1,
trim:true
	},
	completed:{
type:Boolean,
default:false

	},
completedAt:{
type:Number,
default:null
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
module.exports = {todo};