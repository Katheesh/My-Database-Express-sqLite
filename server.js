const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000

	var messages = [];
    var subscribers = [];

function refresh(){

	db.each("SELECT id, email FROM subscribers", function(err, row) {
	    subscribers.push({id: row.id, email: row.email})
	});

	db.each("SELECT id, name, phone, email, message FROM messages", function(err, row) {
	    messages.push({id: row.id, name: row.name, phone: row.phone, email: row.email, message: row.message})
	});
}

// routes  
app.get("/api/subscribers", function(req, res) {	
	refresh()	
    res.status(200).json(subscribers)
    console.log("SENT RESPONSE")
    subscribers = [];
})

app.get("/api/messages", function(req, res) {
	refresh();
    res.status(200).json(messages)
    console.log("SENT RESPONSE")
    messages = [];
})

app.post('/api/add/subscriber',function(req,res){
  db.run(`INSERT INTO subscribers (email) VALUES (?)`, [req.body.subscriber], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.status(200).json({"status": `Successfully added email with rowid:  ${this.lastID}`})
  });
  
});

app.post('/api/add/message',function(req,res){
  db.run(`INSERT INTO messages (name, phone, email, message) VALUES (?,?,?,?)`, [req.body.name, req.body.phone, req.body.email, req.body.message], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.status(200).json({"status": `Successfully added message with rowid:  ${this.lastID}`})
  });
});

// run server
app.listen(port, () => console.log("Server started on 3000"))
app.on('listening', function() {

})