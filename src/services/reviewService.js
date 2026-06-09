import { Review } from "../models/Review.js"

export const createReview = async (data) => {
  const review = new Review(data)
  return await review.save()
}

export const getReviewsByMovie = async (movieId) => {
  return await Review.find({ movieId })
}

export const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true })
}

export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id)
}
