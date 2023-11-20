const express = require('express')
const app = express()
const formData = require('express-form-data');//parse postman post req body
const winston = require('winston');
const bodyParser = require('body-parser');//parse html form data

app.use(formData.parse());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

app.use(function(req,res,next){
  console.log('Request URL:', req.originalUrl)
  console.log('Request Type:', req.method)
  console.log("Request Body : "+JSON.stringify(req.body));
  console.log("Response Body : "+JSON.stringify(res.body));
  console.log("Request Header : "+JSON.stringify(req.header));
  console.log("Response Header : "+JSON.stringify(res.header));
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/addTodo', function (req, res,next) {
  console.log("title : "+req.body.title);
  var responseText = "Todo Added"
  responseText+="<br> Todo title : "+req.body.title;
  res.send(responseText);
  next();
})

app.listen(3000)