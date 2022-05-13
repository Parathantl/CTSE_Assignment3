const express = require('express');
var _ = require("underscore");
const fs = require('fs')
var bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

const port = 3001;

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

app.post('/api/v1/checkout', function(req,res){
    const orderId = req.body.orderId;
    const productId = req.body.productId;
    const noOfItems = req.body.noOfItems;
    const total = req.body.total;
    const name = req.body.name;
    const address = req.body.address;
    const contactNumber = req.body.contactNumber;
    const data = loadJSON('data.json')
    data.push(
        {
            "orderId": orderId,
            "productId": productId,
            "noOfItems": noOfItems,
            "total": total,
            "name":name,
            "address": address,
            "contactNumber": contactNumber
        }
    );
    saveJSON('data.json',data);
    res.status(201).json({
        message: 'Checkout details added successfully',
        post: {
            orderId: orderId,
            productId: productId,
            noOfItems: noOfItems,
            total: total,
            name:name,
            address: address,
            contactNumber: contactNumber
        }
    })
})

app.get('/api/v1/checkout/all', (req, res) => {
	fs.readFile('data.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  obj = JSON.parse(data);
	  res.send(obj);
	});
});

app.get('/api/v1/checkout/:orderId', function(req, res) {
	fs.readFile('data.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  obj = JSON.parse(data);
	  var filtered = _.where(obj, {orderId: req.params.orderId});
	  res.send(filtered);
	});
});


app.listen(port, () => console.log(`Checkout microservice listening on port ${port}!`))