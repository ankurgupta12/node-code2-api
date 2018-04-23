var {MongoClient} = require('mongodb');
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
db.collection('todos').findOneAndDelete({text:"anku"}).then((result)=>{
console.log(result);
});

	//db.close();
})
