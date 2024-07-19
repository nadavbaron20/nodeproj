const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: String,
}, {
    _id: false,
})

const imageSchema = new mongoose.Schema({
    url: String,
    alt: String,
}, {
    _id: false,
})

const nameSchema = new mongoose.Schema({
    first: String,
    middle: String,
    last: String,
}, {
    _id: false,
})

module.exports = { addressSchema, imageSchema, nameSchema }