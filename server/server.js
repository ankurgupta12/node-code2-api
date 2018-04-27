var express = require('express');
var {ObjectID} = require('mongodb');
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
var { todo } = require('./model/todo');
var app = express();

app.use(bodyParser.json());

// post method 
app.post('/todos', (req, res) => {
	var todo = new todo({
    text: ""
});
    console.log(req.body);
    todo.text = req.body.text;
    todo.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }, (e) => {
        console.log(e);
        res.status(400).send(e);
    });
});

// get method for todo 
app.get('/todos',(req,res)=>{
	todo.find().then((todos)=>{
		res.status(200).send({TodoData:todos})
	},(e)=>{
		res.status(400).send(e);
	});
});
app.get('/todos/:id',(req,res)=>{
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
	return res.status(404).send({message:'Id is not valid'});
}
todo.findById(id).then((todo)=>{
if(!todo){
	return res.status(404).send({message:'there is no data in db'});
}
return res.status(200).send({todo:todo});
}).catch((e)=>{
	res.status(404).send({message:"error in server"});
});

});

app.listen('3000', () => {
    console.log('started on port 3000');
})

module.exports = {
    app: app
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