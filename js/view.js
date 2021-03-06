import * as controller from "./controller.js";


let containerFilmes = document.querySelector('#container-filmes');

async function carregaFilmes(){
    let filmesResponse = await controller.buscaFilmes()
    populaView(filmesResponse);
}

function populaView(filmesResponse) {
    let categorias = filmesResponse.map((filme) => filme.categoria)
    categorias =  [...new Set(categorias)];
    categorias.sort()

    categorias.forEach(categoria => {
        let filmesFiltrados = filmesResponse.filter((filme) => filme.categoria === categoria)
        // filmesFiltrados = filmesFiltrados.sort((a, b) => 0.5 - Math.random());
        let filmesHTML = '';

        filmesFiltrados.forEach((filme) => {
            filmesHTML += `
                <div class="filme" id="${filme.id}">
                    <img class="img-filme" src="${filme.cartaz}" alt="" srcset="">
                    <div class="info-filme">
                        <div class="dados-filme">
                            <p class="label-nome-filme">Nome</p>
                            <p class="nome-filme">${filme.nome}</p>
                            <p class="label-desc-filme">Descrição</p>
                            <p class="desc-filme">${filme.descricao}</p>
                        </div>
                        <div class="rodape-filme">
                            <p class="duracao-filme">${filme.duracao}</p>
                            <img  class="indicacao-img" src="${retornaClassificacao(filme.classificacao)}" alt="">
                        </div>
                    </div>
                </div>
            `
        });

        containerFilmes.innerHTML += `
        <div class="categoria">
            <span>${categoria}</span>

                <div class="filmes">${filmesHTML}</div>

               
            </div>
        </div>
        `

    });
}

function retornaClassificacao(classificacao){
    switch (classificacao){
        case 0:
            return './images/classificacoes/livre.jpg'
        case 10:
            return './images/classificacoes/10.jpg'
        case 12:
            return './images/classificacoes/12.jpg'
        case 14:
            return './images/classificacoes/14.jpg'
        case 16:
            return './images/classificacoes/16.jpg'
        case 18:
            return './images/classificacoes/18.jpg'
    }
}

carregaActions()

async function carregaActions(){
    await carregaFilmes()
    let filmesContainer = document.querySelectorAll('.filmes');
    filmesContainer.innerHTML = ''

    let filmes = document.querySelectorAll('.filme');
    let setasDireita = document.querySelectorAll('.seta-direita');
    let setasEsquerda = document.querySelectorAll('.seta-esquerda');

    filmes.forEach(filme => filme.addEventListener('mouseover', () => {
        filme.style.zIndex = '1';
        filme.childNodes[1].style.transform = 'scale(1.3)'
        filme.childNodes[1].style.zIndex = '100'
        filme.childNodes[1].style.filter = 'grayscale(50%) blur(3px)'
        filme.childNodes[1].style.opacity = '0.6'

        filme.childNodes[3].style.visibility = 'visible'
        filme.childNodes[3].style.zIndex = '100'
        filme.childNodes[3].style.transform = 'scale(1.3)';
    }));
    
    filmes.forEach(filme => filme.addEventListener('mouseout', () => {
        filme.style.zIndex = '0';
        filme.childNodes[1].style = 'transform: scale(1); z-index: 1;'
        filme.childNodes[3].style = 'visibility: hidden; transform: scale(1);';
    }));


    setasDireita.forEach(setaDireita => setaDireita.addEventListener('click', () => {
        let container = setaDireita.parentElement.childNodes[3]
        container.scrollLeft += 300;
    }))

    setasEsquerda.forEach(setaEsquerda => setaEsquerda.addEventListener('click', () => {
        let container = setaEsquerda.parentElement.childNodes[3]
        container.scrollLeft -= 300;
    }))
}

document.querySelector('#btn-excluir').addEventListener('click', () => {
    ativarExclusao()
    window.scroll(0, window.innerHeight);
})

function ativarExclusao(){
    document.querySelector('#btn-incluir').style.display = 'none'
    document.querySelector('#btn-excluir').style.display = 'none'
    document.querySelector('#btn-editar').style.display = 'none'

    let btn_cancelar = document.querySelector('#btn-cancelar')
    btn_cancelar.style.display = 'flex';

    btn_cancelar.addEventListener('click', () => {
        window.scroll(0, window.innerHeight)
        window.location.reload()
    });

    animacaoExclusao()

    setClickOnCard()
}

function setClickOnCard(){
    let filmes = document.querySelectorAll('.filme');

    filmes.forEach((filme) => {
        filme.addEventListener('click', () => {
            let senha = prompt('Senha para apagar o filme')
            senha === '123' ? controller.deletaFilme(filme.id) : alert('senha incorreta'), window.location.reload()        
        })
    })
}

function animacaoExclusao(){
    let filmes = document.querySelectorAll('.filme');

    filmes.forEach(filme => {
        filme.style.animation = `excluir${Math.floor(Math.random() * 2) + 1} 400ms infinite`
        filme.addEventListener('mouseover', () => {
            document.querySelectorAll('.info-filme').forEach(info => info.style.display = 'none');
        })

        filme.addEventListener('mouseout', () => {
            document.querySelectorAll('.info-filme').forEach(info => info.style.display = '');
        })
    });
}

