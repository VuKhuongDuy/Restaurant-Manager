var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var mysql = require('mysql');
const db =
{
    person: "asdasd",
    sex: "female",
    date: "1/1/2000"
}

var connection = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"12345678",
    database:"restaurant"
});

app.get("/",function(req,res){
    console.log('login');
    connection.connect();
    connection.query('select * from user',function(err,results,fields){
        if(err) throw err;
        else res.json(results);
    })
})

app.get("/dashboard", function(req,res){
    console.log('get');
    connection.connect();
    connection.query("select * from bill",function(err,results,fields){
        if(err) throw err;
        else res.json(results);
    });
    connection.end();
})

app.listen(3001);

