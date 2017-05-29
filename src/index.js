"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose.connect('mongodb://localhost:27017/test');
// For POST-Support
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

function get_collection(name){
    var connection = mongoose.connection
    connection.on('error', console.error.bind(console, 'connection error:'));
    // connection.db.collection(name, function(err, collection){
    //     collection.find({}).toArray(function(err, data){
    //         console.log(data); // it will print your collection data
    //     })
    // });
    return connection.db.collection(name)
}
function create_collection(name, schema){
    var collection_schema = mongoose.Schema(schema)
    //collection.methods.xxx = function(){}
    var collection = mongoose.Model(name, collection_schema)
    return collection
}
function create_document(collection, document){
    var document = new collection(document)
    return document
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/sayhello', upload.array(), function (request, response) {
    var name = request.body.name;
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    }
    else {
        console.log('Hello ' + name);
    }
    response.send('POST request to homepage');
});

//find 
app.get('/:collection/:name', function (request, response) {
    var reply = []
    get_collection(request.params.collection).findOne({name: request.params.name}, function(err, self){
        if (err) console.info(err)
        // response.json(self)
        // console.info(self)
    })
    get_collection(request.params.collection).find({name: request.params.name}).toArray((err, docu)=>{
        response.json(docu)
    })

});

// http://localhost:3000/api/sayhello/John
app.get('/api/sayhello/:name', function (request, response) {
    var name = request.params.name;
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    }
    else {
        response.json({
            'message': name
        });
    }
});

// http:localhost:3000/api/sayhello?name=NodeJS
app.get('/api/sayhello/', function (request, response) {
    var name = request.query.name;
    var result = {
        message: name
    };
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    }
    else {
        response.send(request.query.name);
    }
});

app.listen(3000);
//# sourceMappingURL=index.js.map