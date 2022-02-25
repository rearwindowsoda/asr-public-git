const {users} = require("../db/db");
const {ObjectId} = require('mongodb')
const jwt = require('jsonwebtoken');
function verifyToken () {

}
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;


    if (token){
        jwt.verify(token, 'your salt here', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/')
            }else{
                console.log(decodedToken);
                 next();
            }
        })
    }else{
        res.redirect('/');
    }

}

const checkUser =  (req, res, next) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'your salt here', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                const o_id = new ObjectId(decodedToken.id + '')
                const user = await users.findOne({_id: o_id})
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }

}

module.exports = {requireAuth, checkUser};