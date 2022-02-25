const express = require('express');
const { users} = require("../db/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authRoutes = express.Router();

// token creating
const maxAge = 3 * 24 * 60 * 60 // 3 days in seconds.
const createToken = (id) => {
    return jwt.sign({id}, 'your salt here', {
        expiresIn: maxAge
    });
}



authRoutes
    .post('/signup', async (req, res) => {
        const {login, password: unsafePassword} = req.body;
        login.toString();
        unsafePassword.toString();

        try{
            //new user validation
            const uniqueLoginValidation = await users.findOne({login: login});
            if (uniqueLoginValidation !== null) {
                res.status(400).send({message: 'Taki login istnieje już w bazie użytkowników.'})
                return
            }
            if (typeof login === "string" && login.trim().length > 5 && typeof unsafePassword === "string" && unsafePassword.length > 5) {

                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(unsafePassword, salt);
                const insertedUser = await users.insertOne({
                    login: login.trim(),
                    password: hashedPassword,
                    points: [],
                });
                const token = createToken(insertedUser.insertedId.toString());
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
                res.status(201).json({user: insertedUser.insertedId.toString()})
            } else {
                res.status(400).json({message: 'Twój login i hasło muszą mieć przynajmniej 6 znaków (nie licząc znaków białych).'})
            }
        }catch (error){
            console.log('error');
            res.status(500).json({message: 'Coś poszło nie tak, spróbuj ponownie. Przepraszamy.'})
        }
    } )

    .post('/login', async (req, res) => {
        try{
            const {login, password} = req.body;
            const findUserInDb = await users.findOne({login: login});
            if (findUserInDb === null) {
                res.status(400).send({message: 'Taki login nie istnieje w bazie użytkowników.'})
                return
            }else{
                const auth = await bcrypt.compare(password, findUserInDb.password );
                if (auth){
                    const token = createToken(findUserInDb._id.toString());
                    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
                    res.status(200).json({user: findUserInDb._id.toString()})
                    return findUserInDb;
                }else{
                    res.status(400).send({message: 'Wprowadzono niepoprawne hasło.'})
                }
            }
        }catch(error){
            res.status(500).send({message: 'Coś poszło nie tak, spróbuj ponownie. Przepraszamy.'})
        }

    });

module.exports = authRoutes;