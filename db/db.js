const {MongoClient} = require("mongodb");
const client = new MongoClient(
    'YOUR DB HERE'
);
const db = client.db('DB USER HERE');
const users = db.collection('COLLECTION NAME HERE');

module.exports = {
    MongoClient,
    client,
    db,
    users
}