
require('dotenv').config();
const db = require('mysql2').createConnection(
	// database location
	{
		host: 'localhost',
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		
		
	}
);

const disconnect = async () => db.end();

// export connection
module.exports = { db, disconnect };
