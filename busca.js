// Dados dos produtos
const produtos = [
    { id: 1, nome: 'Tênis Esportivo', preco: 199.90, imagem: 'img/produto1.jpg' },
    { id: 2, nome: 'Camisa de Futebol', preco: 79.90, imagem: 'img/produto2.jpg' },
    { id: 3, nome: 'Boné Estiloso', preco: 49.90, imagem: 'img/produto1.jpg' },
    // Adicione mais produtos conforme necessário
];

let carrinho = [];

// Inicializa a Stripe
const stripe = Stripe('sua-chave-publica-do-stripe');
const elementos = stripe.elements();

// Função para carregar os produtos na página
function carregarProdutos() {
    const listaProdutos = document.getElementById('produtos-lista');
    listaProdutos.innerHTML = ''; // Limpa a lista existente

    produtos.forEach(produto => {
        const divProduto = document.createElement('div');
        divProduto.className = 'produto';
        divProduto.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        listaProdutos.appendChild(divProduto);
    });
}

// Função de busca de produtos
function filtrarProdutos() {
    const busca = document.getElementById('busca-input').value.toLowerCase();
    const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(busca)
    );
    produtos.length = 0; // Limpar a lista de produtos
    produtos.push(...produtosFiltrados);
    carregarProdutos();
}

// Adiciona um produto ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        carrinho.push(produto);
        atualizarCarrinho();
    }
}

// Atualiza o carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('carrinho-lista');
    listaCarrinho.innerHTML = ''; // Limpa a lista do carrinho

    carrinho.forEach(item => {
        const divItem = document.createElement('div');
        divItem.className = 'carrinho-item';
        divItem.innerHTML = `
            <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
        `;
        listaCarrinho.appendChild(divItem);
    });
}

// Inicia o processo de pagamento
function iniciarPagamento() {
    const pagamentoForm = document.getElementById('pagamento-form');
    pagamentoForm.style.display = 'block'; // Mostra o formulário de pagamento

    const card = elementos.create('card');
    card.mount('#card-element');

    document.getElementById('payment-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const {token, error} = await stripe.createToken(card);

        if (error) {
            alert('Erro no pagamento: ' + error.message);
        } else {
            alert('Pagamento realizado com sucesso!');
        }
    });
}

// Carrega os produtos ao iniciar
carregarProdutos();
