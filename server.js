var express = require('express');
var app = express();
var mysql = require('mysql'); var http = require("http");
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('access-Control-Allow-Origin', '*');
    next();
});


app.post('/signup', (req, res) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'hexcode',
        database: 'slambook'
    });
    connection.connect();

    connection.query('INSERT INTO `users`(`Name`, `userid`, `Password`, `Email`) VALUES (?,?,?,?)', [req.body.name, req.body.userid, req.body.password, req.body.email], function (err, rows, fields) {
        if (err) {
            store = JSON.stringify({ status: 'error', code: 300 });
        } else {
            store = JSON.stringify({ status: 'success', code: 200 });
        }
        console.log(store);
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(store)
    });
    connection.end();
});

app.post('/checklogin', (req, res) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'hexcode',
        database: 'slambook'
    });
    connection.connect();
    var sql = "SELECT `userid`  FROM `users` WHERE `userid`=? and `Password`=?";
    connection.query(sql, [req.body.userid, req.body.password], function (err, rows, fields) {
        if (err) {
            // store=JSON.stringify({status:'failed',code:300});
           // throw err;
        } else {
            if (rows.length > 0) {
                store = JSON.stringify({ status: 'success', code: 200 });
            } else {
                store = JSON.stringify({ status: 'failed', code: 300 });
            }
        }
        console.log(store);
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(store)
    });
    connection.end();
});

app.get('/questions', (req, res) => {
    var store = '[';
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'hexcode',
        database: 'slambook'
    });

    connection.connect();
    connection.query("SELECT `qid`, `questions` FROM `questions` WHERE `private`!='true'", function (err, emp_rows, fields) {
        if (err) { console.log(err) };
        var len = emp_rows.length;
        console.log(len);
        if (len != 0) {
            for (i = 0; i < len; i++) {
                store = store + JSON.stringify({ qid: emp_rows[i].qid, questions: emp_rows[i].questions });
                if (i != len - 1) {
                    store = store + ',';
                }
            }
            store = store + ']';
            console.log(store);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(store)
        }
    });

    connection.end();
});

app.post('/viewsingle', (req, res) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'hexcode',
        database: 'slambook'
    });
    connection.query("SELECT `questions`.`qid`,`questions`.`questions`,`usersans`.`ans` FROM `questions`,`usersans` WHERE `usersans`.`userid`=? and `usersans`.`who`=? and `usersans`.`qid`=`questions`.`qid`", [req.body.userid, req.body.who], function (err, emp_rows, fields) {
        if (err) { console.log(err) };
        console.log(emp_rows);
        var len = emp_rows.length;
        console.log(len);
        if (len != 0) {
            var store = '[';
            for (i = 0; i < len; i++) {
                store = store + JSON.stringify({ qid: emp_rows[i].qid, questions: emp_rows[i].questions, ans: emp_rows[i].ans });
                if (i != len - 1) {
                    store = store + ',';
                }
            }
            store = store + ']';
            console.log(store);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(store)
        } else {
            store = JSON.stringify({ status: 'no data', code: 400 });
            console.log(store);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(store)
        }
    });
    connection.end();
});

app.post('/dashboard', (req, res) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'hexcode',
        database: 'slambook'
    });

    connection.connect();
    connection.query("SELECT `who`,`relatedby` FROM `usersans` WHERE `userid`=? GROUP BY `who`", [req.body.userid], function (err, emp_rows, fields) {
        if (err) { console.log(err); };
        var len = emp_rows.length;
        console.log(len);
        if (len != 0) {
            var store = '[';
            for (i = 0; i < len; i++) {
                store = store + JSON.stringify({ who: emp_rows[i].who, relatedby: emp_rows[i].relatedby });
                if (i != len - 1) {
                    store = store + ',';
                }
            }
            store = store + ']';
            console.log(store);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(store)
        } else {
            store = JSON.stringify({ status: 'no data', code: 400 });
            console.log(store);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(store)
        }
    });

    connection.end();
});

 
app.post('/customquestion', (req, res) => {

    var InsertNewQuestion = function(data,callback) {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'hexcode',
            database: 'slambook'
        });
        connection.connect();
        var sql1 = "SELECT max(`qid`) AS 'qid' FROM `questions` WHERE 1";
        connection.query(sql1,function (err, rows, fields) {
            if (!err) {
              callback(data,rows[0].qid,InsertUserQus);
            }
        });
        connection.end();
      };


    var InsertFirst = function(data,qid,callback) {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'hexcode',
            database: 'slambook'
        });
        connection.connect();
        var sql1 = "INSERT INTO `questions`(`qid`, `questions`, `private`) VALUES (?,?,?)";
        connection.query(sql1,[parseInt(qid)+1,data,'true'], function (err, rows, fields) {
            if (!err) {
              callback(qid);
            }
        });
        connection.end();
      };
    
      var InsertUserQus = function(data){
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'hexcode',
            database: 'slambook'
        });
        connection.connect();
          var sql="INSERT INTO `userquestions`(`userid`, `qid`) VALUES (?,?)";
          connection.query(sql,[req.body.userid,parseInt(data)+1], function (err, rows, fields) {
            if (!err) {
                var store = JSON.stringify({ status: 'success', code: 200 });
                console.log(store);
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(store)
            }
        });
        connection.end();
      }

    InsertNewQuestion(req.body.question,InsertFirst);
});



app.post('/questionadd', (req, res) => {
    console.log(req.body);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'hexcode',
        database: 'slambook'
    });
    connection.connect();
    var sql = "INSERT INTO `userquestions`(`userid`, `qid`) VALUES (?,?)";
    connection.query(sql, [req.body.userid, req.body.qid], function (err, rows, fields) {
        if (err) {
            store = JSON.stringify({ status: 'failed', code: 300 });
        } else {
            store = JSON.stringify({ status: 'success', code: 200 });
        }
        console.log(store);
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(store)
    });
    connection.end();
});

app.post('/getquestion', (req, res) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'hexcode',
        database: 'slambook'
    });
    connection.query("SELECT `questions`.`qid`,`questions`.`questions` FROM `userquestions`,`questions` WHERE `userquestions`.`userid`=? and `userquestions`.`qid`=`questions`.`qid`", [req.body.userid], function (err, emp_rows, fields) {
        if (err) { console.log(err) };
        console.log(emp_rows);
        var len = emp_rows.length;
        console.log(len);
        if (len != 0) {
            var store = '[';
            for (i = 0; i < len; i++) {
                store = store + JSON.stringify({ qid: emp_rows[i].qid, questions: emp_rows[i].questions });
                if (i != len - 1) {
                    store = store + ',';
                }
            }
            store = store + ']';
            console.log(store);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(store)
        } else {
            store = JSON.stringify({ status: 'no data', code: 400 });
            console.log(store);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(store)
        }
    });
    connection.end();
});

app.post('/addanswers', (req, res) => {
    console.log(req.body);
    var count = 0;
    var store;
    var sql = "INSERT INTO `usersans`(`qid`, `userid`, `who`, `relatedby`, `ans`) VALUES (?,?,?,?,?)";
    for (let i = 0; i < req.body.questions.length; i++) {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'hexcode',
            database: 'slambook'
        });
        connection.connect();
        connection.query(sql, [req.body.questions[i], req.body.userid, req.body.who, req.body.relatedby, req.body.answers[i].ans], function (err, rows, fields) {
            if (!err) {
                count++;
            }
            if (count == req.body.questions.length - 1) {
                store = JSON.stringify({ status: 'success', code: 200 });
                console.log(store);
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(store)
            }
        });
        connection.end();
    }
});

app.post('/username', (req, res) => {
    var sql = "SELECT `Name` FROM `users` WHERE `userid`=?";
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'hexcode',
            database: 'slambook'
        });
        var store;
        connection.connect();
        connection.query(sql, [ req.body.userid], function (err, rows, fields) {
            if (!err) {
                store = JSON.stringify({ name:rows[0].Name, status: 'success', code: 200 });
            }
               console.log(store);
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(store)
        });
        connection.end();
});

app.get('/deleteAll', (req, res) => {
    var mysql = require('mysql');
	var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'hexcode',
            database: 'slambook'
        });
    connection.connect();
    connection.query("DELETE FROM `questions` WHERE 1", function (err, emp_rows, fields) {});
    connection.query("DELETE FROM `userquestions` WHERE 1", function (err, emp_rows, fields) {});
    connection.query("DELETE FROM `users` WHERE 1", function (err, emp_rows, fields) {});
    connection.query("DELETE FROM `usersans` WHERE 1", function (err, emp_rows, fields) {});
    connection.end();
});


app.post('/addQuestions', (req, res) => {
    var sql = "INSERT INTO `questions` (`qid`, `questions`, `private`) VALUES (NULL, ?, '')"
        var mysql = require('mysql');
	var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'hexcode',
            database: 'slambook'
        });
        var store;
        connection.connect();
        connection.query(sql, [ req.body.question], function (err, rows, fields) {
            if(err){throw err}
            if (!err) {
                store = JSON.stringify({ status: 'success', code: 200 });
            }
               console.log(store);
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(store)
        });
        connection.end();
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
