const express = require('express');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const homeRouter = express.Router();

homeRouter.get('/', requireAuth, checkUser, async (req, res) => {
	res.render('logged/logged', {
		date: new Date(),
	});
});

module.exports = {
	homeRouter,
};
