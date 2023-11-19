const express = require("express");
const router = express.Router();
const { createComment, getCommentsByChapter, deleteComment } = require("../controllers/commentController");
const authMiddleware = require('../middlewares/auth');
const { validateAPIMangaId, validateChapterId, validateUserId, validateCommentId } = require('../middlewares/validateInput');

router.post("/", authMiddleware, validateUserId, validateAPIMangaId, validateChapterId, createComment);
router.get("/:mangaId/:chapterId", authMiddleware, validateAPIMangaId, validateChapterId, getCommentsByChapter);
router.delete('/:commentId', authMiddleware, validateUserId, validateCommentId, deleteComment);

module.exports = router;
