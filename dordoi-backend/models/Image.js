const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    card: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;