const mongoose = require('mongoose');

const ReadingListSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mangas: [{
        manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
        status: { type: String } // Add the 'status' field here
    }]
});

const ReadingList = mongoose.model('ReadingList', ReadingListSchema);

module.exports = ReadingList;
