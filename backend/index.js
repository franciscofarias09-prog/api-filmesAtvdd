const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

//conecta
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'backlog_filmes'
});

//testar a conexão
conexao.connect((erro) => {
  if (erro) {
    console.log('Erro ao conectar no banco');
  } else {
    console.log('Conectado ao MySQL');
  }
});

app.get('/', (req, res) => {
  res.send('API de filmes funcionando');
});

//listar filmes
app.get('/filmes', (req, res) => {
  conexao.query('SELECT * FROM filmes', (erro, resultado) => {
    if (erro) {
      res.status(500).send(erro);
    } else {
      res.json(resultado);
    }
  });
});

//cadastrar
app.post('/filmes', (req, res) => {
  const titulo = req.body.titulo;
  const genero = req.body.genero;

  conexao.query(
    'INSERT INTO filmes (titulo, genero) VALUES (?, ?)',
    [titulo, genero],
    (erro) => {
      if (erro) {
        res.status(500).send(erro);
      } else {
        res.send('Filme cadastrado com sucesso');
      }
    }
  );
});

//atualizar
app.put('/filmes/:id', (req, res) => {
  const id = req.params.id;
  const titulo = req.body.titulo;
  const genero = req.body.genero;

  conexao.query(
    'UPDATE filmes SET titulo = ?, genero = ? WHERE id = ?',
    [titulo, genero, id],
    (erro) => {
      if (erro) {
        res.status(500).send(erro);
      } else {
        res.send('Filme atualizado');
      }
    }
  );
});

//deletar 
app.delete('/filmes/:id', (req, res) => {
  const id = req.params.id;

  conexao.query(
    'DELETE FROM filmes WHERE id = ?',
    [id],
    (erro) => {
      if (erro) {
        res.status(500).send(erro);
      } else {
        res.send('Filme removido');
      }
    }
  );
});

//iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
