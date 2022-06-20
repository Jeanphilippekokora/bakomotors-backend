const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = { timestamps: true };

const CommandeSchema = new Schema({
    model: {
        type: String,
    },
    comment: {
        type: String,
    },
    username: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
}, options);

module.exports = Commande = mongoose.model('Commande', CommandeSchema);