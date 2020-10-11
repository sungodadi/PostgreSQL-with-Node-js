
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//post gre code
const db = require('./queries')
const { Pool } = require('pg')
const port = 3000


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/users', db.createUser)

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = [req.body.first_name, req.body.last_name]
   console.log(response);
   res.end(JSON.stringify(response[0]) + JSON.stringify(response[1]));
   var name = JSON.stringify(response[0]);
   var email = JSON.stringify(response[1]);
   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })

   
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})