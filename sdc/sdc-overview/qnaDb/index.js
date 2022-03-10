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


const connectionString = 'postgres://postgres:Uncompromised@ec2-54-86-36-189.compute-1.amazonaws.com:5432/questionsandanswers';
const db = new Client({connectionString: connectionString});
db.connect(err => {
    if (err) {
        console.log('Connection error from PostGres');
    } else {
        console.log("Successfully connected to Postgres");
    }
});

module.exports = {db};