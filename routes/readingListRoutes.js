const express = require('express');
const router = express.Router();

const {
    createReadingList,
    addNewManga,
    getReadingList,
    deleteAllMangasFromReadingList,
    deleteMangaFromReadingList
} = require('../controllers/readingListController');

const {
    validateUserId,
    validateMangaId,
    validateListId
} = require('../middlewares/validateInput');

const authMiddleware = require('../middlewares/auth');

// Create a new reading list for a user
router.post('/', authMiddleware, validateUserId, createReadingList);

// Add a new manga to a reading list
router.post('/:listId/mangas', authMiddleware, validateListId, validateMangaId, addNewManga);

// Get a reading list by ID
router.get('/:listId', authMiddleware, validateListId, getReadingList);

// Delete all mangas from a reading list
router.delete('/:listId/mangas', authMiddleware, validateListId, deleteAllMangasFromReadingList);

// Delete a manga from a reading list
router.delete('/:listId/mangas/:mangaId', authMiddleware, validateListId, validateMangaId, deleteMangaFromReadingList);

module.exports = router;
