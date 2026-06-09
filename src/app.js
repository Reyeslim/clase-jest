import express from "express"
import reviewRoutes from "./routes/reviewRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"

const app = express()

app.use(express.json())

app.use(reviewRoutes)
app.use(wishlistRoutes)

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Bienvenido a la clase de MongoDB",
  })
})

export default app
