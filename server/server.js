require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // req.body = {}

// third-in middleware
app.use(morgan('dev'));

// Routes
app.use('/api/cards', require('./routes/cardsRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const { PORT } = process.env

connectDB().then(() => {
    // Run server
    app.listen(PORT, () => { console.log(`Servrr is listening for requests on http://127.0.0.1:${PORT}`) })
})




