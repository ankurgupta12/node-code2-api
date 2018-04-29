var express = require('express');
var _lodash = require('lodash');
var { ObjectID } = require('mongodb');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

var mongoos = require('./../mongoose');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/todoApp", { native_parser: true });
db.bind('users');


var mongoos = require('mongoose');
var port = process.env.port || 3000;
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
var   user   = require('./model/user');

var user1 = new user({email:'',password:'',tokens:[]});
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
app.get('/todos', (req, res) => {
    todo.find().then((todos) => {
        res.status(200).send({ TodoData: todos })
    }, (e) => {
        res.status(400).send(e);
    });
});
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: 'Id is not valid' });
    }
    todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({ message: 'there is no data in db' });
        }
        return res.status(200).send({ todo: todo });
    }).catch((e) => {
        res.status(404).send({ message: "error in server" });
    });

});


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: 'id is not valid' });
    }
    todo.findByIdAndRemove(id).then((result) => {
        if (!result) {
            return res.status(404).send({ message: "there is no data For delete" });
        }
        return res.status(200).send({ message: "successfully Deleted!..." });
    }).catch((e) => {
        res.status(404).send({ message: 'Server Error' });
    });
});



app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _lodash.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: 'id is not valid' });
    }
    if (_lodash.isBoolean(body.completed) && body.completed) {

        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;

    }
    todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send({ mess: "there is no Update" })
        }
        return res.status(200).send({ mess: "updated successfully!..." });
    }).catch((e) => {
        res.status(404).send({ mess: "there is error" });
    });
});


app.post('/user', (req, res) => {
    var userOb = {};
    var access = 'auth';
    var body = _lodash.pick(req.body, ['email', 'password']);
    userOb.email = req.body.email;
    userOb.password = req.body.password;
    var token = jwt.sign({_id:user1._id,access},'abc123').toString();
    userOb.token = token;
    db.users.insert(userOb, function(err, user2) {
    	
	//user1.tokens.push({access,token});
	// user1.save().then(()=>{
		res.header('authorization', token).send(user2);
	//})

      
            
       // });
        // }).catch((e)=>{
        //     	console.log("eee",e);
        // res.status(404).send(e);
        //     }); 
    });
});

app.listen(port, () => {
    console.log('started on port' + port);
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