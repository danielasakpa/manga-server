const mongoose = require('mongoose');

// Manga schema
const MangaSchema = new mongoose.Schema({
    apiMangaId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverPhoto: { type: String },
    readingStatus: { type: String, enum: ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read'], default: 'Plan to Read' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
});

const Manga = mongoose.model("Manga", MangaSchema);

module.exports = Manga;