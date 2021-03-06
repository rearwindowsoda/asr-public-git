const express = require('express');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const loggedRouter = express.Router();
const { users } = require('../utils/db/db');
const { ObjectId } = require('mongodb');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

loggedRouter
	.get('/', requireAuth, checkUser, async (req, res) => {
		res.render('logged/logged', {
			date: new Date(),
		});
	})
	.get('/logout', requireAuth, checkUser, async (req, res) => {
		res.cookie('jwt', '', { maxAge: 1 });
		res.redirect('/unsigned');
	})

	//fetch points from db
	.get('/points', requireAuth, checkUser, async (req, res) => {
		try {
			if (res.locals.user) {
				const o_id = new ObjectId(res.locals.user._id);
				const foundUser = await users.findOne({ _id: o_id });
				const points = foundUser.points;
				res.render('points/points', {
					points,
				});
			}
		} catch (e) {
			console.error(e);
		}
	})
	//save points to db
	.post('/points', requireAuth, checkUser, async (req, res) => {
		try {
			if (res.locals.user) {
				const o_id = new ObjectId(res.locals.user._id);
				const foundUser = await users.findOne({ _id: o_id });
				const userArray = foundUser.points;
				const today = format(new Date(), 'dd.MM.yyyy');
				userArray.push({
					date: today,
					points: req.body.getLocalPoints,
					id: uuid(),
				});

				await users.updateOne(
					{ _id: o_id },
					{
						$set: {
							points: userArray,
						},
					}
				);
				res
					.status(201)
					.json({ message: 'Pomyślnie zapisano punkty do bazy danych' });
				return;
			} else {
				res.status(400).json({
					message: 'Błąd w zapisie punktów do bazy danych. Spróbuj później.',
				});
				return;
			}
		} catch (e) {
			console.error(e);
		}
	})

	//delete points from db
	.delete('/:id', requireAuth, checkUser, async (req, res) => {
		try {
			if (res.locals.user) {
				const o_id = new ObjectId(res.locals.user._id);
				const foundUser = await users.findOne({ _id: o_id });
				const points = foundUser.points;
				const filteredPointsTable = points.filter(
					(element) => element.id !== req.params.id
				);
				await users.updateOne(
					{ _id: o_id },
					{
						$set: {
							points: filteredPointsTable,
						},
					}
				);
				console.log(filteredPointsTable);
				res.render('points/points', {
					points: filteredPointsTable,
				});
			}
		} catch (e) {
			console.error(e);
		}
	});

module.exports = {
	loggedRouter,
};
