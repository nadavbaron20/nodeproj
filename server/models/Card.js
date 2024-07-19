const mongoose = require('mongoose');
const { addressSchema, imageSchema } = require('./common')

// defained a mongoose schema: 
// this describe the shape of one 'card' in our cards collection
const cardSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    phone: String,
    email: String,
    web: String,
    image: imageSchema,
    address: addressSchema,
    bizNumber: Number,
    user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    like: [mongoose.SchemaTypes.ObjectId],
}, {
    timestamps: true,
});

// Mongoose Model methods ---------------------------------------------------------------
/** 
 * @param {string} searchTerm - Your search term (case insensitive) :'your search term'  
 * @param {Array.<String>} searchFields    - The fields to search inside : [title','email',...]  
*/

cardSchema.static.multipleFieldsStringSearch = function (searchTerm, searchFields) {
    const query = {
        $or:
            [
                ...searchFields.map(field => ({
                    [field]: new RegExp(searchTerm, 'i')
                }))
            ]
    };
    return this.find(query);
    // find({$or[{title:"First card"},{description:"First card"},{subtitle:"First card"}]})
};

// compile the schema into a model.
// we will use this model to access our cards collection.
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
/*
someKey: {
// Thing we should use mongoose schema for: 
type:String,   // set the expected type (Number,String,...)
unique:true,   // make sure this value in unique for this key in the entrie collection
imutable:true,  // imutable=true -> this field like 'const', once its value is set it can't change
// Thing we should use JOI schema for 
default: "defaultImage.jpg"  // set default *static* value
//default: () => Date.now()    // set default *static* value
required:true,                // is fiels required?
min:1,                        // set Number type. set minimum numeric value.
max:120,                      // set Number type. set maximum numeric value.
minLength:5,                  // set String type. set minimum string length.
minLength:15,                 // set String type. set maximum string length.
lowercase:true,
uppercase:true,
trim:true,
},
// Mongoose Model methods ---------------------------------------------------------------

// Document-level functions (operated at the single document level)
cardSchema.methods.sayWhereYouLive = function () {
    console.log(`I live in ${this.address.street}, ${this.address.city} `);
    this.image.alt = 'some new value'
    this.save()
}

// Model-Level function (operates at the collection level)
cardSchema.statics.updateEmptyImageUrl = async function () {
    try {
        return this.updateMany({ "image.url": "" }, { "image.url": "http://www.images.com/default-image.jpg" })
    } catch (err) {
        throw err
    }
}

// Virtuals function ()
cardSchema.virtual('fullAddress').get(function () {
    return `My full address is: ${this.address.street} ${this.address.houseNumber} ${this.address.city} ${this.address.country} ${this.address.zip}`
})

// ----------------------------------------------------------------------------------------
*/