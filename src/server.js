import "dotenv/config"
import app from "./app.js"
import { dbConnection } from "./db/database.js"

const PORT = process.env.PORT || 3000

try {
  await dbConnection()
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
} catch (error) {
  console.error("Error al conectar con MongoDB", error.message)
  process.exit(1)
}
