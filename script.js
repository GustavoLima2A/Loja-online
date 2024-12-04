// Exemplo de um script simples para adicionar produtos ao carrinho
let carrinho = [];

const adicionarAoCarrinho = () => {
    carrinho.push("Produto Adicionado");
    alert("Produto adicionado ao carrinho! Total: " + carrinho.length);
};

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", adicionarAoCarrinho);
});
