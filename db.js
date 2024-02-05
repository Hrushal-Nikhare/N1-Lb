// routes/users.js
const express = require('express');
const router = express.Router();

const { MongoClient } = require('mongodb');

require('dotenv').config()

async function AddOrUpdateData(DB, name, updated) {
    const client = new MongoClient(DB);
    try {
        await client.connect();
        await upsertListingByName(client, name, updated);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("N1").collection("LB")
        .updateOne({ name: nameOfListing },
            { $set: updatedListing },
            { upsert: true });
    // console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    // if (result.upsertedCount > 0) {
    //     console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    // } else {
    //     console.log(`${result.modifiedCount} document(s) was/were updated.`);
    // }
}



router.post('/post', (req, res) => {
    // req.body; // JavaScript object containing the parse JSON
    // console.log(`POST request from user ${req.body.username}`)
    // console.log(req.body);
    console.log(`POST request from user "${req.body.username}" at ${new Date().toLocaleString()}`);
    res.send('OK');
    AddOrUpdateData(process.env.DB, req.body.username, req.body);
});
// export the router module so that server.js file can use it
module.exports = router;