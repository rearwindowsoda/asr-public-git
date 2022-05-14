const express = require('express');
const unsignedRouter = express.Router();

unsignedRouter.get('/', async (req, res) => {
	res.render('home/home', {
		date: new Date(),
	});
});

module.exports = {
	unsignedRouter,
};
