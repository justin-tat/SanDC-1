const {Client} = require('pg');

/*
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "questionsandanswers",
    password: "Uncompromised",
    port: 5432
});
*/

//connectionString = 'dbType://username:password@address:port/database'
var ip = 'ec2-52-91-81-110.compute-1.amazonaws.com';
ip = "localhost";
const connectionString = `postgres://postgres:Uncompromised@${ip}:5432/questionsandanswers`;
const db = new Client({connectionString: connectionString});
db.connect(err => {
    if (err) {
        console.log('Connection error from PostGres', err);
    } else {
        console.log("Successfully connected to Postgres");
    }
});

module.exports = {db};