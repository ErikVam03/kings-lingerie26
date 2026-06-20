// Seleciona os elementos do modal
const modal = document.getElementById('modal-produto');
const modalImg = document.getElementById('modal-img');
const modalNome = document.getElementById('modal-nome');
const modalDesc = document.getElementById('modal-desc');
const btnFechar = document.getElementById('fechar-modal');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');

let listaImagens = [];
let indiceAtual = 0;

// Função para atualizar a foto no modal
function atualizarFoto() {
    modalImg.src = listaImagens[indiceAtual];
}

// Configura o clique nos botões "VER" de cada produto
document.querySelectorAll('.btn-ver').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.produto');
        
        // Pega os dados do produto clicado
        const nome = card.getAttribute('data-nome');
        const desc = card.getAttribute('data-desc');
        const imgsString = card.getAttribute('data-imgs');
        
        // Converte a string de imagens em uma lista real
        listaImagens = imgsString.split(',').map(img => img.trim());
        indiceAtual = 0;
        
        // Preenche o modal
        modalNome.innerText = nome;
        modalDesc.innerText = desc;
        atualizarFoto();
        
        // Mostra o modal
        modal.style.display = 'flex';
    });
});

// Ações dos botões de navegação
btnNext.addEventListener('click', () => {
    if (listaImagens.length > 0) {
        indiceAtual = (indiceAtual + 1) % listaImagens.length;
        atualizarFoto();
    }
});

btnPrev.addEventListener('click', () => {
    if (listaImagens.length > 0) {
        indiceAtual = (indiceAtual - 1 + listaImagens.length) % listaImagens.length;
        atualizarFoto();
    }
});

// Fecha o modal
btnFechar.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha se clicar fora da área branca do modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Abre a imagem em uma nova aba ao clicar nela (Corrigido para rodar uma única vez)
modalImg.addEventListener('click', () => {
    if (modalImg.src) {
        window.open(modalImg.src, '_blank');
    }
});
