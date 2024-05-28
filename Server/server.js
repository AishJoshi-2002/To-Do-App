const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const api = require('./routes/api');
app.use('/api', api);

const cors = require('cors'); // cross origin resource sharing
app.use(cors());

app.get('/', function(req, res){
    res.send("Hello from server");
})

app.listen(3000, ()=>{
    console.log("Server running on localhost 3000");
})

