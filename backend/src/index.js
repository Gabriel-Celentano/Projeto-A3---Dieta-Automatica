require('dotenv').config()
const express = require('express')
const app = express()
const mysql = require('mysql2')
const { GoogleGenerativeAI } = require('@google/generative-ai')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');

  connection.query('CREATE DATABASE IF NOT EXISTS log_database', (err, result) => {
    if (err) throw err;
    console.log('Banco de dados criado ou já existente!');

    connection.query('USE log_database', (err, result) => {
      if (err) throw err;

      const tabelaLogs = `
        CREATE TABLE IF NOT EXISTS logs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          prompt VARCHAR(2000) NOT NULL,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          response VARCHAR(2000) NOT NULL
        )
      `;
      connection.query(tabelaLogs, (err, result) => {
        if (err) throw err;
        console.log('Tabela de logs criada com sucesso!');
        connection.end();
      });
    });
  });
});

// Middleware
app.use(express.json())

app.get('/hello-world', (req, res) => {
  res.json({msg: 'Hello, world!'})
})

app.post('/consultar', async (req, res) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash'
  })
  const { prompt } = req.body
  const result = await model.generateContent(prompt)

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
    const query = `INSERT INTO logs (prompt, timestamp, response) VALUES ("${prompt}", NOW(), "${result.response.text()}")`
    connection.query("USE log_database", (err, queryResult) => {
      if (err) throw err;
    })
    connection.query(query, (err, queryResult) => {
      if (err) throw err;
      console.log('Execução registrada nos logs com sucesso!');
    })
    connection.end();
  })
  res.json({resposta: result.response.text()})
})

app.listen(3000, () => {
  console.log('Aplicação subiu')
})