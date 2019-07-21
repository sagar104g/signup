const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const signup = require('./routes/signup');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/signup',signup);

app.listen(3000,function(){
    console.log("listining on port 3000")
})