const mongoose = require('mongoose');

const validateUserId = (req, res, next) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    next();
};

const validateCommentId = (req, res, next) => {
    const commentId = req.body.commentId || req.params.commentId;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({ error: 'Invalid comment ID' });
    }

    next();
};


const validateListId = (req, res, next) => {
    const listId = req.body.listId || req.params.listId;

    if (!mongoose.Types.ObjectId.isValid(listId)) {
        return res.status(400).json({ error: 'Invalid list ID' });
    }

    next();
};

const validateMangaId = (req, res, next) => {
    const apiMangaId = req.params.mangaId;

    if (typeof apiMangaId !== "string" || !apiMangaId) {
        return res.status(400).json({ message: "Invalid api manga ID" });
    }

    next();
};

const validateChapterId = (req, res, next) => {
    const chapterId = req.body.chapterId || req.params.chapterId;

    if (typeof chapterId !== "string" || !chapterId) {
        return res.status(400).json({ message: "Invalid chapter ID" });
    }

    next();
};

module.exports = {
    validateUserId,
    validateCommentId,
    validateMangaId,
    validateListId,
    validateChapterId
};
