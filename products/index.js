const express = require('express');
var _ = require("underscore");
const fs = require('fs');

const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors());

app.get('/api/v1/products', (req, res) => {

	fs.readFile('data.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  obj = JSON.parse(data);
	  res.send(obj);
	});
	
});

app.get('/api/v1/products/:id', function(req, res) {

	fs.readFile('data.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  obj = JSON.parse(data);
	  var filtered = _.where(obj, {id: req.params.id});
	  res.send(filtered);
	});
	
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
