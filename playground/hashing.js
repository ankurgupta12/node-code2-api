var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');
var data = {
	id:10

};
var token = jwt.sign(data,'ankii');
console.log(token);
var decode = jwt.verify(token,"ankii");
console.log("decode", decode);

// var mes = "ANkii Ankuu";
// var hasing = SHA256(mes).toString();
// console.log(hasing);
// var data = {
// 	id:4
// }
//  var token = {
//  	data:data,
//  	hash:SHA256(JSON.stringify(data) + 'someSecret').toString()
//  }

//  var resultHash = SHA256(JSON.stringify(token.data)+ 'someSecret').toString();
//  if(resultHash===token.hash){
//  	console.log('data not changes');
//  }else{
//  	console.log('data changes');
//  }