var mongoos = require('mongoose');
mongoos.Promise = global.Promise;
mongoos.connect('mongodb://localhost:27017/todoApp');

module.exports = {
	mongoos:mongoos
}