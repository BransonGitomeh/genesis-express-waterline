var express = require("express");
var app  = express();

var waterlineInstance = require("waterline")
//adapters
module.exports = function(collections,config,callback){
	//initialize waterline
	var Waterline = new waterlineInstance();

	//innitialise the collections
	collections.map(function(collection){
		// console.log(collection)
		var collectionInstance = waterlineInstance.Collection.extend(collection)
		Waterline.loadCollection(collectionInstance)
	})

	Waterline.initialize(config,function(err,models){
		if(err) throw err;
		app.locals.collections = models.collections
		callback(app) //returns an express app with models
	})
}
