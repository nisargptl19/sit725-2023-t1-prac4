var express = require('express');
const { MongoClient } = require('mongodb');
var app = express();
var port = process.env.port || 3001;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Mongodb configuration

const dbUri = 'mongodb+srv://sit725-nisarg:sit725-222599856@cluster0.lnz95om.mongodb.net/?retryWrites=true&w=majority';
var client = new MongoClient(dbUri, { useNewUrlParser: true });
var connectDb;


function connectToDb(collection) {
    client.connect((err) => {
        console.log("Calling to Marvel")
        connectDb = client.db('sit-725').collection(collection);
        if (!err) {
            console.log('Marvel connected successfully!!');
            console.log(connectDb);
        } else {
            console.error(err);
            console.log("Call refused")
        }
    });
}


app.post('/api/add-character', (req, res) => {
    let character = req.body;
    console.log("character:", character)
    connectDb.insertOne(character, (err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'Superhero Successfully Joined Marvel Army!!'});
        }
    });
});


app.get('/api/get-all-characters',(req,res) => {
    connectDb.find().toArray((err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'Superheros at Destinations'});
        }
    });
})


app.listen(port,()=>{
    console.log('App listening to: ' + port);
    connectToDb('marvel')
});
