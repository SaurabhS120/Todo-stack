const express = require('express')
const app = express()
const formData = require('express-form-data');//parse postman post req body
const winston = require('winston');
const bodyParser = require('body-parser');//parse html form data
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:mysecretpassword@172.17.0.2:5432/notesdb')


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

app.get('/getTodo', function (req, res,next) {
  setTimeout(() => {
    db.any('SELECT * FROM notes;')
    .then((data) => {
      var responsBody=''
      responsBody +='<html>'
      responsBody +='<body>'
      responsBody +='<table>'
      responsBody +='<td>Id</td>'
      responsBody +='<td>Note</td>'
      data.forEach((item)=>{
        var id = item.id;
        var note = item.note;
        console.log('ID:', id)
        console.log('Note:', note)
        responsBody +='<tr>'
        responsBody +=`<td>${id}</td>`
        responsBody +=`<td>${note}</td>`
        responsBody +='</tr>'
      })
      responsBody +='</table>'
      responsBody +='</body>'
      responsBody +='</html>'
      res.send(responsBody)
    })
    .catch((error) => {
      console.log('ERROR:', error)
      next('ERROR:', error)
    })
  }, 100)
})

app.post('/addTodo', function (req, res,next) {
  var todo_title = req.body.title;
  console.log("title : "+todo_title);
  setTimeout(() => {
    db.none('INSERT INTO notes(note) VALUES (${note});',{
      note:todo_title
    })
    .then((data) => {
      var responseText = "Todo Added"
      responseText+="<br> Todo title : "+todo_title;
      res.send(responseText)
    })
    .catch((error) => {
      console.log('ERROR:', error)
      next('ERROR:', error)
    })
  }, 100)
})


app.get('/deleteAllNotes', function (req, res,next) {
  setTimeout(() => {
    db.none('DELETE FROM notes;')
    .then((data) => {
      res.send("All notes are deleted")
    })
    .catch((error) => {
      console.log('ERROR:', error)
      next('ERROR:', error)
    })
  }, 100)
})

app.listen(3000)