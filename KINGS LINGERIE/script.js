/* =========================================================
   KINGS LINGERIE
   Interações do site
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal-produto");
    const modalImg = document.getElementById("modal-img");
    const modalNome = document.getElementById("modal-nome");
    const modalDesc = document.getElementById("modal-desc");

    const btnFechar = document.getElementById("fechar-modal");
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");

    const imageCurrent = document.getElementById("image-current");
    const imageTotal = document.getElementById("image-total");

    const productButtons = document.querySelectorAll(".btn-ver");

    let listaImagens = [];
    let indiceAtual = 0;


    /* =====================================================
       MODAL
    ===================================================== */

    function atualizarFoto() {

        if (!listaImagens.length) {
            return;
        }

        modalImg.style.opacity = "0";

        const novaImagem = new Image();

        novaImagem.onload = () => {

            modalImg.src = novaImagem.src;

            requestAnimationFrame(() => {
                modalImg.style.opacity = "1";
            });
        };

        novaImagem.onerror = () => {

            console.warn(
                "Não foi possível carregar:",
                listaImagens[indiceAtual]
            );

            modalImg.style.opacity = "1";
        };

        novaImagem.src = listaImagens[indiceAtual];

        imageCurrent.textContent = indiceAtual + 1;
        imageTotal.textContent = listaImagens.length;
    }


    function abrirModal(card) {

        const nome = card.dataset.nome || "Produto";
        const descricao = card.dataset.desc || "";

        const imagens = card.dataset.imgs || "";

        listaImagens = imagens
            .split(",")
            .map(img => img.trim())
            .filter(Boolean);

        indiceAtual = 0;

        modalNome.textContent = nome;
        modalDesc.textContent = descricao;

        atualizarFoto();

        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        requestAnimationFrame(() => {
            modal.classList.add("active");
        });
    }


    function fecharModal() {

        modal.classList.remove("active");

        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

        setTimeout(() => {

            modal.style.display = "none";

            modalImg.src = "";

        }, 250);
    }


    /* =====================================================
       BOTÕES DOS PRODUTOS
    ===================================================== */

    productButtons.forEach(button => {

        button.addEventListener("click", event => {

            const card = event.currentTarget.closest(".product-card");

            if (card) {
                abrirModal(card);
            }

        });

    });


    /* =====================================================
       PRÓXIMA / ANTERIOR
    ===================================================== */

    function proximaImagem() {

        if (!listaImagens.length) {
            return;
        }

        indiceAtual =
            (indiceAtual + 1) %
            listaImagens.length;

        atualizarFoto();
    }


    function imagemAnterior() {

        if (!listaImagens.length) {
            return;
        }

        indiceAtual =
            (indiceAtual - 1 + listaImagens.length) %
            listaImagens.length;

        atualizarFoto();
    }


    btnNext.addEventListener("click", proximaImagem);
    btnPrev.addEventListener("click", imagemAnterior);


    /* =====================================================
       FECHAR MODAL
    ===================================================== */

    btnFechar.addEventListener("click", fecharModal);


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            fecharModal();
        }

    });


    /* =====================================================
       TECLADO
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (!modal.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            fecharModal();
        }

        if (event.key === "ArrowRight") {
            proximaImagem();
        }

        if (event.key === "ArrowLeft") {
            imagemAnterior();
        }

    });


    /* =====================================================
       ABRIR IMAGEM EM NOVA ABA
    ===================================================== */

    modalImg.addEventListener("click", () => {

        if (!modalImg.src) {
            return;
        }

        window.open(
            modalImg.src,
            "_blank",
            "noopener,noreferrer"
        );

    });


    /* =====================================================
       SWIPE NO CELULAR
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    modalImg.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    modalImg.addEventListener("touchend", event => {

        touchEndX = event.changedTouches[0].screenX;

        const distancia = touchEndX - touchStartX;

        if (Math.abs(distancia) < 50) {
            return;
        }

        if (distancia < 0) {
            proximaImagem();
        } else {
            imagemAnterior();
        }

    }, { passive: true });


    /* =====================================================
       REVELAÇÃO AO ROLAR
    ===================================================== */

    const elementosAnimados = document.querySelectorAll(
        ".benefit-card, .product-card, .step, .story-content, .section-heading"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    elementosAnimados.forEach(elemento => {

        elemento.classList.add("scroll-hidden");

        observer.observe(elemento);

    });


    /* =====================================================
       ANIMAÇÃO DOS CARDS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `
        .scroll-hidden {
            opacity: 0;
            transform: translateY(25px);
            transition:
                opacity .7s ease,
                transform .7s ease;
        }

        .scroll-hidden.visible {
            opacity: 1;
            transform: translateY(0);
        }

        #modal-img {
            transition: opacity .18s ease;
        }
    `;

    document.head.appendChild(style);


    /* =====================================================
       LINKS INTERNOS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});
