const express = require('express')
const app = express()

// Middleware
app.use(express.json())

app.get('/hello-world', (req, res) => {
  res.json({msg: 'Hello, world!'})
})


app.listen(3000, () => {
  console.log('Aplicação subiu')
})