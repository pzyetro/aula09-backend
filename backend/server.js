const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware essesciais
app.use(cors());//Permitir que o frontend acesse este backend sem erros de CORS
app.use(express.json());//Permite que o Express entenda requisições com corpo em JSON

//Passo 1 mémoria ram do servidor
let produtosEmMemoria = [
    { id: 1, nome: 'Teclado Mecânico RGB', preco: 150.00 },
    { id: 2, nome: 'Mouse Gamer 3200 DPI', preco: 85.50 }
];


//Rota GET
app.get('/produtos', (req, res) => {
    console.log('GET /produtos] Enviado produtos em mémoria...')
    res.json(produtosEmMemoria);
});

//Rota POST
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ erro: 'Nome e preço são obrigatórios!' });
    }

    const novoProduto = {
        id: Date.now(),
        nome,
        preco: parseFloat(preco)
    };

    produtosEmMemoria.push(novoProduto);
    console.log('[POST /proditos] Produto adicionado na RAM: $ {novoProduto.nome}');

    res.status(201).json(novoProduto);
});

// Rota PUT: alterar um produto
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, preco } = req.body;
  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }

  if (typeof nome !== 'string' || nome.trim() === '' || !Number.isFinite(Number(preco))) {
    return res.status(400).json({ mensagem: 'Informe um nome e um preço válidos' });
  }

  produto.nome = nome.trim();
  produto.preco = Number(preco);

  res.json(produto);
});

//ROTA delete: remova um produto pelo id
app.delete('/produtos/:id', (req,res) => produto)

//listen 
app.listen(PORT, () => {
    console.log('==========================================================');
    console.log('Servidor Back-End rodando em http://localhost:${PORT}');
    console.log('Rota de Produtos ativa em: http://localhost:3000/produtos');
    console.log('STATUS: MODO MÉMORIA RAM ATIVO');
    console.log('==========================================================');
})
