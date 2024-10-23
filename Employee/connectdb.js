const { Client } = require('pg');
require('dotenv').config();

const dbClient =new Client({
    host: 'localhost',
    port: 3000,
    user: 'postgres',
    password:'123',
    database: 'postgres',
  });

async function connectDb () {
  const db = await dbClient.connect();  

 const res = await dbClient.query(`
    CREATE TABLE IF NOT EXISTS employee_detail (
	emp_id varchar PRIMARY KEY,
	first_name varchar(50) NOT NULL,
	middle_name varchar(50) NULL,
	last_name varchar(50) NOT NULL,
	date_of_birth DATE  NOT NULL,
	phone_number varchar(10)  UNIQUE NOT NULL CHECK (length(phone_number)= 10),
	email varchar(50) UNIQUE CHECK (email LIKE '%@%'),
	address varchar(80) NOT NULL,
	role varchar(50),
	experience int
)`

);
const attend = await dbClient.query(`
	CREATE TABLE IF NOT EXISTS attendance (
	emp_id varchar(100) ,
	present BOOLEAN NOT NULL ,
	entrytime TIMESTAMP 
	)`
	

);
 console.debug('Employee table created successfully' )
};

module.exports = {connectDb,dbClient}












// PG_HOST = localhost
// PG_PORT = 3000
// PG_USER = postgres
// PG_PASSWORD = 123
// PG_DATABASE =  test_user