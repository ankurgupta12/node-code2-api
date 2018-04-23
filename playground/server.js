var {MongoClient} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db)=>{
	if(err){
		console.log('error to connect');
	}
	console.log('connected to monog');
	db.collection('todos').insertOne({

text:'Ankii',
completed:false
	},(err,result)=>{
	if(err){
		console.log(err);
	}
	console.log(JSON.stringify(result));

	})
	db.close();
})
