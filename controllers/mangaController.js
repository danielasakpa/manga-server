const Manga = require('../models/manga');

// Get all manga
const getAllManga = async (req, res) => {
    try {
        const mangaList = await Manga.find();
        res.status(200).json({ success: true, message: 'Manga retrieved successfully', mangaList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve manga', error });
    }
};

// Create a new manga
const createManga = async (req, res) => {
    const { apiMangaId, userId, reading_status, cover_photo, title, description } = req.body;

    try {
        const manga = new Manga({ apiMangaId, userId, reading_status, cover_photo, title, description });
        await manga.save();
        res.status(201).json({ success: true, message: 'Manga created successfully', manga });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create manga', error });
    }
};

// Get a manga by ID
const getMangaById = async (req, res) => {
    const { mangaId } = req.params;

    try {
        const manga = await Manga.findById(mangaId);
        if (!manga) {
            return res.status(404).json({ success: false, message: 'Manga not found' });
        }
        res.status(200).json({ success: true, message: 'Manga retrieved successfully', manga });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve manga', error });
    }
};

// Update a manga by ID
const updateMangaById = async (req, res) => {
    const { mangaId } = req.params;
    console.log(mangaId);
    const { apiMangaId, reading_status, cover_photo, title, description, rating } = req.body;

    try {
        const manga = await Manga.findByIdAndUpdate(mangaId, { apiMangaId, reading_status, cover_photo, title, description, rating }, { new: true });
        if (!manga) {
            return res.status(404).json({ success: false, message: 'Manga not found' });
        }
        res.status(200).json({ success: true, message: 'Manga updated successfully', manga });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update manga', error });
    }
};

// Delete a manga by ID
const deleteMangaById = async (req, res) => {
    const { mangaId } = req.params;

    try {
        const manga = await Manga.findByIdAndDelete(mangaId);
        if (!manga) {
            return res.status(404).json({ success: false, message: 'Manga not found' });
        }
        res.status(200).json({ success: true, message: 'Manga deleted successfully', manga });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete manga', error });
    }
};

module.exports = { getAllManga, createManga, getMangaById, updateMangaById, deleteMangaById };
