import {
  addMovieToWishlist,
  removeMovieFromWishlist,
  isMovieInWishlist,
} from "../services/wishlistService.js"

describe("addMovieToWishlist", () => {
  test("añade una película a la lista", () => {
    const list = ["movie1"]
    const result = addMovieToWishlist(list, "movie2")

    expect(result).toHaveLength(2)
    expect(result).toContain("movie2")
  })

  test("no añade duplicados", () => {
    const list = ["movie1"]
    const result = addMovieToWishlist(list, "movie1")
    expect(result).toHaveLength(1)
  })

  test("funciona con una lista vacía", () => {
    const list = []
    const result = addMovieToWishlist(list, "movie1")

    expect(result).toHaveLength(1)
    expect(result).toContain("movie1")
  })

  test("no muta la lista original", () => {
    const originalList = ["movie1"]
    addMovieToWishlist(originalList, "movie2")

    expect(originalList).toHaveLength(1)
  })
})

describe("removeMovieFromWishlist", () => {
  test("elimina una película de la lista", () => {
    const list = ["movie1", "movie2", "movie3"]
    const result = removeMovieFromWishlist(list, "movie2")

    expect(result).not.toContain("movie2")
    expect(result).toHaveLength(2)
  })

  test("devuelve la misma lista si la peli no estaba", () => {
    const list = ["movie1", "movie2", "movie3"]
    const result = removeMovieFromWishlist(list, "movie4")

    expect(result).toHaveLength(3)
  })

  test("devuelve array vacío si la lista tenía solo esa película", () => {
    const list = ["movie1"]
    const result = removeMovieFromWishlist(list, "movie1")

    expect(result).toHaveLength(0)
  })

  test("no muta la lista original", () => {
    const originalList = ["movie1", "movie2", "movie3"]
    removeMovieFromWishlist(originalList, "movie3")

    expect(originalList).toHaveLength(3)
  })
})

describe("isMovieInWishlist", () => {
  test("devuelve true si la película está en la lista", () => {
    const list = ["movie1", "movie2", "movie3"]
    const result = isMovieInWishlist(list, "movie1")

    expect(result).toBe(true)
  })

  test("devuelve false si la película no está en la lista", () => {
    const list = ["movie1", "movie2", "movie3"]
    const result = isMovieInWishlist(list, "movie4")

    expect(result).toBe(false)
  })

  test("devuelve false para una lista vacía", () => {
    const list = []
    const result = isMovieInWishlist(list, "movie1")

    expect(result).toBe(false)
  })
})
