import express from 'express'
import usuarios from "./src/api_usuarios.js"
import productos from "./src/api_productos.js"

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/usuarios", usuarios);
app.use("/productos", productos);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
