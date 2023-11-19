const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { getAllManga, createManga, getMangaById, updateMangaById, deleteMangaById } = require("../controllers/mangaController");

const { validateUserId, validateMangaId, validateAPIMangaId } = require('../middlewares/validateInput');

// Get all manga
router.get('/', authMiddleware, getAllManga);

// Create a new manga
router.post('/', authMiddleware, validateUserId, validateAPIMangaId, createManga);

// Get a manga by ID
router.get('/:mangaId', authMiddleware, validateMangaId, getMangaById);

// Update a manga by ID
router.patch('/:mangaId', authMiddleware, validateMangaId, validateAPIMangaId, updateMangaById);

// Delete a manga by ID
router.delete('/:mangaId', authMiddleware, validateMangaId, deleteMangaById);

module.exports = router;
