const mysql = require('mysql');



let pollconnection;

const connectionCreate = function connect() {
  let data = {


    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    connectionLimit: 5, //mysql connection pool length
    database: "network"

  }

  pollconnection = mysql.createPool(data)

  pollconnection.getConnection((err, connection) => {
    if (err) {
      console.error(' Poll Connecting Error:-' + err);

    } else {
      console.log('Database connected successfully');
      connection.release();
    }
  });



}

connectionCreate();

module.exports = pollconnection;