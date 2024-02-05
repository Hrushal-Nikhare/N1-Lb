const express = require('express');
const app = express();
const helmet = require("helmet");

app.use(express.json());
app.use(helmet());

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60,
});

app.use(limiter);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.send('hello root node');// this gets executed when you visit http://localhost:3000/

});


// Include route files
const dataRoute = require('./routes/db');
// const productsRoute = require('./routes/products');

// Use routes
app.use('/data', dataRoute);
// app.use('/products', productsRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});