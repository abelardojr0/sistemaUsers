const express = require('express')
const cors = require('cors')
require('dotenv').config()
const pool = require('./db.js')
const PORT = 3000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuarios')
    res.json(rows)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao conectar no banco', error: error.message })
  }
})

app.post('/users', async (req, res) => {
  const { nome_usuario, email, senha } = req.body

  try {
    const consulta =
      'INSERT INTO usuarios (nome_usuario, email, senha) VALUES ($1, $2, $3)'

    await pool.query(consulta, [nome_usuario, email, senha])

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao cadastrar usuário', error: error.message })
  }
})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { nome_usuario, email, senha } = req.body

  try {
    const consulta =
      'UPDATE usuarios SET nome_usuario = $1, email = $2, senha = $3 WHERE id = $4'

    await pool.query(consulta, [nome_usuario, email, senha, id])
    res.status(200).json({ message: 'Usuário atualizado com sucesso' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao atualizar usuário', error: error.message })
  }
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const consulta = 'DELETE FROM usuarios WHERE id = $1'

    await pool.query(consulta, [id])
    res.status(200).json({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao deletar usuário', error: error.message })
  }
})

app.listen(PORT, () => {
  console.log('API está no AR')
})
