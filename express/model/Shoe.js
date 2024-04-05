const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoeSchema = Schema({
    model: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true  }
});


module.exports = mongoose.model('Shoe', shoeSchema);
//When model method call it's create shoes collection

