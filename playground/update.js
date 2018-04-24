var {MongoClient,ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db)=>{
	if(err){
		console.log('error to connect');
	}
	console.log('connected to monog');
// 	db.collection('todos').deleteMany({

// text:'Ankii',
// completed:false
// 	}).then((result)=>{
	
// 	console.log(JSON.stringify(result));

// 	});
// db.collection('todos').deleteOne({text:"ankur"}).then((result)=>{
// console.log(result);
// });
db.collection('todos').findOneAndUpdate({_id:new ObjectId("5ade09887d2506a76da2f466")},{$set: {completed:false}},{returnOriginal:false}).then((result)=>{
console.log(result);
});

	//db.close();
})
