require('dotenv').config()
const express = require('express')
const app = express()
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_ROOT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
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
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          message VARCHAR(1000) NOT NULL
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

app.get('/consultar', (req, res) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_ROOT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
    const query = "INSERT INTO logs (timestamp, message) VALUES (NOW(), 'Teste da Entrega 06')"
    connection.query("USE log_database", (err, result) => {
      if (err) throw err;
    })
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log('Execução registrada nos logs com sucesso!');
    })
    connection.end();
  })
})

app.listen(3000, () => {
  console.log('Aplicação subiu')
})