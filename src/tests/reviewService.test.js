import {
  calculateAverage,
  filterByMinRating,
  createReviewObject,
  sortReviews,
} from "../services/reviewService.js"

describe("Todos los tests sobre calculateAverage", () => {
  test("calcula la media correctamente", () => {
    const ratings = [8, 9, 10]
    const results = calculateAverage(ratings)
    expect(results).toBe(9)
  })

  test("devuelve 0 si el array está vacío", () => {
    const ratings = []
    const results = calculateAverage(ratings)

    expect(results).toBe(0)
  })

  test("devuelve 0 si ratings es null", () => {
    const ratings = null
    const results = calculateAverage(ratings)

    expect(results).toBe(0)
  })

  test("funciona con un solo valor", () => {
    const ratings = [7]
    const results = calculateAverage(ratings)

    expect(results).toBe(7)
  })

  test("calcula correctamente con decimales", () => {
    const ratings = [6, 7]
    const results = calculateAverage(ratings)

    expect(results).toBe(6.5)
  })
})

describe("filterByMinRating", () => {
  const reviews = [
    { movieId: "movie1", rating: 5 },
    { movieId: "movie2", rating: 8 },
    { movieId: "movie3", rating: 9 },
  ]

  test("filtra reviews por rating mínimo", () => {
    const results = filterByMinRating(reviews, 8)
    expect(results).toHaveLength(2)
  })

  test("devuelve todos los elementos si el mínimo es 1", () => {
    const results = filterByMinRating(reviews, 1)
    expect(results).toHaveLength(3)
  })

  test("devuelve 0 si ningún elemento supera el rating mínimo", () => {
    const results = filterByMinRating(reviews, 10)
    expect(results).toHaveLength(0)
  })
})

describe("createReviewObject", () => {
  test("crea un objeto de review correctamente", () => {
    const review = createReviewObject("movie1", "user1", 9, "Genial!")

    expect(review.movieId).toBe("movie1")
    expect(review.userId).toBe("user1")
    expect(review.rating).toBe(9)
    expect(review.comment).toBe("Genial!")
    expect(review.createdAt).toBeDefined()
  })

  test("usa string vacío como comentario por defecto", () => {
    const review = createReviewObject("movie1", "user1", 9)
    expect(review.comment).toBe("")
  })

  test("lanza error cuando el rating es mayor que 10", () => {
    expect(() => createReviewObject("movie1", "user1", 11)).toThrow(
      "El rating debe tener un valor entre 1 y 10",
    )
  })

  test("lanza error si el movieId es null", () => {
    expect(() => createReviewObject(null, "user1", 6)).toThrow(
      "movieId, userId y rating son obligatorios",
    )
  })
})

describe("sortReviews", () => {
  const reviews = [
    { movieId: "movie1", rating: 6 },
    { movieId: "movie2", rating: 9 },
    { movieId: "movie3", rating: 7 },
  ]

  test("ordena de mayor a menor por defecto", () => {
    const result = sortReviews(reviews)

    expect(result[0].rating).toBe(9)
    expect(result[2].rating).toBe(6)
  })

  test("ordena de menor a mayor", () => {
    const result = sortReviews(reviews, "asc")

    expect(result[0].rating).toBe(6)
    expect(result[2].rating).toBe(9)
  })

  test("no muta el array original", () => {
    sortReviews(reviews)
    expect(reviews[0].rating).toBe(6)
  })
})
