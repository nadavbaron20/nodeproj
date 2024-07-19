/*
=================================================================
=================================================================
                  *** WARNING ***
    RUNNING THIS SCRIPT WILL DELETE AND/OR
    OVERITE YOUR BCARDS DATABASE !!!!!!
=================================================================
=================================================================
*/

const connectDB = require('./config/db')
const { cards, users } = require('./data/data')
const Card = require('../models/Card');
const User = require('../models/User');

const seedAll = async () => {
    try {
        // Seed cards
        // delete all cards  
        await Card.deleteMany();
        // insert seed cards
        const insertCard = await Card.insertMany(cards);
        console.log(` [i] Inserted ${insertCard.length} cards `);
        // Seed users
        // delete all existing users  
        await User.deleteMany();
        // insert seed cards
        const insertUser = await User.insertMany(users);
        ` [i] Inserted ${insertCard.length} users `
        //success
        console.log('[v] completed successfully');
        process.exit(0);
    } catch (e) {
        process.exit(1);
    }
}


// connect to database
connectDB().then(() => {
    // Seed all collection
    seedAll()
});

