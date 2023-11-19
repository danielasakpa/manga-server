const ReadingList = require('../models/readingList');
const Manga = require('../models/manga');

const createReadingList = async (req, res) => {
    const { userId } = req.body;

    try {
        // Check if the user already has a reading list
        const existingReadingList = await ReadingList.findOne({ user_id: userId });
        if (existingReadingList) {
            return res.status(400).json({ success: false, message: 'User already has a reading list' });
        }

        // Create a new reading list for the user
        const readingList = new ReadingList({ user_id: userId, mangas: [] });
        await readingList.save();
        res.status(201).json({ success: true, message: 'Reading list created successfully', readingList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create reading list', error });
    }
};


const addNewManga = async (req, res) => {
    const { listId, mangaId, status } = req.body; // Assuming 'status' is passed in the request body

    try {
        // Check if manga already exists in reading list
        const existingManga = await ReadingList.findOne({ _id: listId, mangas: mangaId });
        if (existingManga) {
            return res.status(400).json({ success: false, message: 'Manga already exists in reading list' });
        }

        // Check if manga exists
        const manga = await Manga.findById(mangaId);
        if (!manga) {
            return res.status(404).json({ success: false, message: 'Manga not found' });
        }

        // Add manga to reading list with status
        const readingList = await ReadingList.findOneAndUpdate(
            { _id: listId },
            { $push: { mangas: { manga: mangaId, status: status } } }, // Include status in the array
            { upsert: true, new: true }
        );

        res.status(200).json({ success: true, message: 'Manga added to reading list', readingList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add manga to reading list', error });
    }
};



const getReadingList = async (req, res) => {
    const { listId } = req.params;

    try {
        const readingList = await ReadingList.findOne({ _id: listId }).populate('mangas');
        if (!readingList) {
            return res.status(404).json({ success: false, message: 'Reading list not found' });
        }
        res.status(200).json({ success: true, message: 'Reading list retrieved successfully', readingList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve reading list', error });
    }
};

const deleteAllMangasFromReadingList = async (req, res) => {
    const { listId } = req.params;

    try {
        const readingList = await ReadingList.findOneAndUpdate(
            { _id: listId },
            { $set: { mangas: [] } },
            { new: true }
        );
        res.status(200).json({ success: true, message: 'All mangas deleted from reading list', readingList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete all mangas from reading list', error });
    }
};

const deleteMangaFromReadingList = async (req, res) => {
    const { listId, mangaId } = req.params;

    try {
        const readingList = await ReadingList.findOneAndUpdate(
            { _id: listId },
            { $pull: { mangas: mangaId } },
            { new: true }
        ).populate('mangas');
        res.status(200).json({ success: true, message: 'Manga deleted from reading list', readingList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete manga from reading list', error });
    }
};

module.exports = { createReadingList, addNewManga, getReadingList, deleteAllMangasFromReadingList, deleteMangaFromReadingList };
