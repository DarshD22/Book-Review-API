const Book = require('../models/Book');
const Review = require('../models/Review');
const paginate = require('../utils/paginate');

exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { author, genre, page, limit } = req.query;
  let query = Book.find();
  if (author) query = query.where('author').regex(new RegExp(author, 'i'));
  if (genre) query = query.where('genre').regex(new RegExp(genre, 'i'));
  const books = await paginate(query, { page, limit });
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  const reviews = await paginate(Review.find({ book: book._id }).populate('user', 'username'), req.query);
  const avgRating = await Review.aggregate([
    { $match: { book: book._id } },
    { $group: { _id: null, avg: { $avg: '$rating' } } }
  ]);
  res.json({ book, avgRating: avgRating[0]?.avg || 0, reviews });
};

exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  const regex = new RegExp(query, 'i');
  const books = await Book.find({ $or: [{ title: regex }, { author: regex }] });
  res.json(books);
};
