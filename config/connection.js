const db = require('mysql2').createConnection(
	// database location
	{
		host: 'localhost',
		user: 'root',
		password: 'My166799sql64$',
		database: 'tracker_db',
	}
);

const disconnect = async () => db.end();

// export connection
module.exports = { db, disconnect };
