var mongoose = require('./../mongoose');
var {todo} = require('./../server/model/todo');
var id = '5ae17fb8ab83825c13b255ea';
// todo.find({
// 	_id:id
// }).then((todos)=>{
// console.log(todos);
// },(e)=>{

// });
// todo.findOne({
// 	_id:id
// }).then((todo)=>{
// console.log(todo);
// },(e)=>{

// });

todo.findById(id).then((todo)=>{
	if(!todo)
		return false;
console.log(todo ,'by id ');
},(e)=>{

});