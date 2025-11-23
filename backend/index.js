import express from 'express'
import usuarios from "./usuarios.js"

const app = express()
const port = 3050

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/usuarios", usuarios);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
