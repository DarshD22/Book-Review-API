const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const review = new Review({ ...req.body, book: req.params.id, user: req.user._id });
    await review.save();
    res.status(201).json(review);
  } catch (e) {
    res.status(400).json({ message: 'Review already exists or invalid data' });
  }
};

exports.updateReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
  if (!review) return res.status(404).json({ message: 'Review not found' });
  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json({ message: 'Review deleted' });
};
