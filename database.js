const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./mydb.sqlite', (err) => {
    if (err) {
        console.log("Error creating database")
    } else {
        console.log('Database connected!')
        db.serialize(function() {
            // do this so that it runs sequentially
            db.run("CREATE TABLE IF NOT EXISTS subscribers(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)");
            db.run("CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, phone TEXT, email TEXT, message TEXT)");

            //db.run("INSERT INTO subscribers (email) VALUES ('ikatheesh@gmail.com')");
            //db.run("INSERT INTO subscribers (email) VALUES ('katheeskumar@outlook.com')");

            //db.run("INSERT INTO messages (name, phone, email, message) VALUES ('katheesh','0779313495', 'ikatheesh@gmail.com', 'sample message here')");

            /*db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closed the database connection.');
            });*/
        })
        

    }
})

module.exports = db;