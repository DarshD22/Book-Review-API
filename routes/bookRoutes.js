const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createBook, getBooks, getBookById, searchBooks } = require('../controllers/bookController');
const { createReview } = require('../controllers/reviewController');

router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
router.post('/', auth, createBook);
router.post('/:id/reviews', auth, createReview);

module.exports = router;