const mongoose = require('mongoose');

const db = process.env.DB_CONNECTION;
const port = 8080;

module.exports = function (app) {
	mongoose
		.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(() =>
			app.listen(port, () => {
				console.log(`Connected to MongoDB and listening on local port ${port}.`);
			})
		)
		.catch((err) => console.log(err.message));
};
