const mysql = require('mysql2');


// Database Connection Credentials
const pool = mysql.createPool({
    host: 'your-host',
    user: 'your-db-username',
    database: 'db-name',
    password: 'db-password'
});


module.exports = pool.promise();