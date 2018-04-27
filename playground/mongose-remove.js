var mongoose = require('./../mongoose');
var {todo} = require('./../server/model/todo');
var id = '5ae17fb8ab83825c13b255ea';


// remove all the documents
// todo.remove({}).then((result)=>{
// console.log(result);
// });


// todo.findOneAndRemove()

// todo.findByIdAndRemove()

todo.findByIdAndRemove(id).then((todo)=>{
	if(!todo)
		return false;
console.log(todo ,'by id ');
},(e)=>{

});