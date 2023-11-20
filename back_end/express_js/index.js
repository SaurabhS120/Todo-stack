const express = require('express')
const app = express()
const formData = require('express-form-data');
const winston = require('winston');

app.use(formData.parse());


const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

app.use(function(req,res,next){
  console.log('Request URL:', req.originalUrl)
  console.log('Request Type:', req.method)
  console.log("Request Body : "+JSON.stringify(req.body));
  console.log("Response Body : "+JSON.stringify(res.body));
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/addTodo', function (req, res,next) {
  console.log(req.body);
  console.log(res.body);
  res.send('aDD TODO')
  next();
})

app.listen(3000)