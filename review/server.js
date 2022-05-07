const express = require('express');
const fs = require('fs')
var _ = require("underscore");
var bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

function loadJSON(filename =''){
    return JSON.parse(
        fs.readFileSync(filename) 
        ? fs.readFileSync(filename).toString() 
        : 'null'
    )
}

function saveJSON(filename = '', json ='""'){
    return fs.writeFileSync(filename, JSON.stringify(json)) 
}

app.post('/v1/api/review', function(req,res){
    const id = req.body.id;
    const pid = req.body.pid;
    const name = req.body.name;
    const rating = req.body.rating;
    const review = req.body.review;
    const data = loadJSON('data.json')
    data.push(
        {
            "id": id,
            "pid": pid,
            "name":name,
            "rating": rating,
            "review": review
        }
    );
    saveJSON('data.json',data);
    res.status(201).json({
        message: 'Your review is posted successfully',
        post: {
            "id": id,
            "pid": pid,
            "name":name,
            "rating": rating,
            "review": review
        }
    })
})

app.get('/api/v1/review/', (req, res) => {
	fs.readFile('data.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  obj = JSON.parse(data);
	  res.send(obj);
	});
});

app.get('/api/v1/review/:pid', function(req, res) {
	fs.readFile('data.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  obj = JSON.parse(data);
	  var filtered = _.where(obj, {pid: req.params.pid});
	  res.send(filtered);
	});
});


app.listen(port, () => console.log(`Microservice of Review is listening on port ${port}!`))