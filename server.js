const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { DateTime } = require('luxon');

const app = express();
app.use(bodyParser.json());

// In-memory storage
let users = [];

// Middleware for logging requests
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
	next();
});

// Lend a Book to a User
app.post('/lend', (req, res) => {
	const { username } = req.body;
	const user = _.find(users, { username });

	if (user && user.borrowedAnything) {
		return res.status(400).json({ message: 'User already has a borrowed item.' });
	}

	if (user) {
		user.borrowedAnything = true;
		user.borrowedDate = DateTime.now().toISO();
	} else {
		users.push({
			username,
			borrowedAnything: true,
			borrowedDate: DateTime.now().toISO(),
		});
	}

	res.status(200).json({ message: 'Book borrowed successfully.', user: _.find(users, { username }) });
});

// Return a Book
app.post('/return', (req, res) => {
	const { username } = req.body;
	const user = _.find(users, { username });

	if (!user || !user.borrowedAnything) {
		return res.status(400).json({ message: 'User does not have any borrowed items.' });
	}

	user.borrowedAnything = false;
	user.borrowedDate = null;

	res.status(200).json({ message: 'Book returned successfully.', user });
});

// Check Overdue Items
app.get('/overdue', (req, res) => {
	const { username } = req.query;
	const user = _.find(users, { username });

	if (!user || !user.borrowedAnything) {
		return res.status(400).json({ message: 'User does not have any borrowed items.' });
	}
	user.borrowedDate = DateTime.now().minus({ days: 15 }).toISO();
	const borrowedDate = DateTime.fromISO(user.borrowedDate);
	const now = DateTime.now();
	const diffInDays = now.diff(borrowedDate, 'days').days;

	if (diffInDays > 14) {
		return res.status(200).json({ message: 'User has overdue items.', overdue: true, daysOverdue: diffInDays });
	} else {
		return res.status(200).json({ message: 'User has no overdue items.', overdue: false });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
