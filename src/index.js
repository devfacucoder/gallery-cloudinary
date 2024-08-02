import app from "./app.js"
const PORT = 5000 || process.env.PORT;
import mongoose from "./db.js";



app.listen(PORT, () => {
  console.log(`abierto cloudnidary en http://localhost:${PORT}`);
});
