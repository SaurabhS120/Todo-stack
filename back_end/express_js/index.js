const express = require('express')
const app = express()

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/addTodo', function (req, res) {
  console.log(req.body);
  console.log(res.body);
  res.send('aDD TODO')
})

app.listen(3000)