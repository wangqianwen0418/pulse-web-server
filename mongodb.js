var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.info("we're connected!")
});

var kittySchema = mongoose.Schema({
        name: String
    });
    //methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
    }
    var Kitten = mongoose.model('Kitten', kittySchema);
    var silence = new Kitten({ name: 'silence' });
    console.log(silence.name);
    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.save(function (err, self) {
        if (err) return console.error(err);
        self.speak();
    });
    silence.save(function (err, self) {
        if (err) return console.error(err);
        self.speak();
    });

    Kitten.find({}).then((kittens)=>{
        console.info(kittens)
    })

Kitten.update({ name: "silence" }, { $set: { name: 'small' }}, (err, self)=>{
    if (err) console.info(err)
    console.info(self)
});

