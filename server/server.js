var express = require('express');
var bodyParser = require('body-parser');
var mongoos = require('./../mongoose');


var mongoos = require('mongoose');
// var todo = mongoos.model('todo',{
// 	text:{
// type:String,
// required:true,
// minlength:1,
// trim:true
// 	},
// 	completed:{
// type:Boolean,
// default:false

// 	},
// completedAt:{
// type:Number,
// default:null
// }
// });
var {todo} = require('./model/todo');
var app = express();

app.use(bodyParser.json());
var todo = new todo({
	text:""
});
// post method 
app.post('/todos',(req,res)=>{
console.log(req.body);
todo.text = req.body.text;
todo.save().then((doc)=>{
console.log(doc);
res.send(doc);
},(e)=>{
console.log(e);
res.status(400).send(e);
});
})

app.listen('3000',()=>{
	console.log('started on port 3000');
})

module.exports = {
	app:app
}

// var newTodo = new todo({
// 	text:'cook dinner'
// });

// newTodo.save().then((doc)=>{
// console.log(doc);
// },(e)=>{
// 	console.log('unable todo save');
// });
// var newTodo = new todo({
// 	text:'cook dinner',
// 	completed:true,
// 	completedAt:0
// });

// newTodo.save().then((doc)=>{
// console.log(doc);
// },(e)=>{
// 	console.log('unable todo save');
// });
// save new smthng
