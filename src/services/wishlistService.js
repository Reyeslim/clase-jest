import { Wishlist } from "../models/Wishlist.js"

export const addToWishlist = async (userId, movieId) => {
  const wishlist = new Wishlist({ userId, movieId })
  return await wishlist.save()
}

export const getWishlistByUser = async (userId) => {
  return await Wishlist.find({ userId })
}

export const removeFromWishlist = async (id) => {
  return await Wishlist.findByIdAndDelete(id)
}
