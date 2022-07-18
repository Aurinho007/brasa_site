import * as controller from "./controller.js";

let $ = document.querySelector.bind(document)

let data = $('#datalist-filmes');
let btnPequisarFilme = $('#btn-pesquisar-filme');
let filmesObj;
let filmeSelecionado = '';

let nome = $('#nome')
let categoria = $('#categoria')
let classificacao = $('#classificacao')
let duracao = $('#duracao')
let descricao = $('#descricao')
let url = $('#url')

async function getNomeFilmes(){
    let filmesResponse = await controller.buscaFilmes();
    geraData(filmesResponse);
}

function geraData(filmes){
    filmesObj = filmes;
    filmes.forEach(filme => {
        data.innerHTML += `<option value="${filme.nome}">`
    });
}

getNomeFilmes();

btnPequisarFilme.addEventListener('click', preencheDados);

function preencheDados(e) {

    let inputFilme = $('#input-pesquisar-filme');
    
    e.preventDefault();

    filmeSelecionado = filmesObj.filter(f => f.nome === inputFilme.value);
    filmeSelecionado = filmeSelecionado[0];
    
    nome.value = filmeSelecionado.nome;
    categoria.value = filmeSelecionado.categoria;
    classificacao.value = filmeSelecionado.classificacao;

    let duracaoFilme = filmeSelecionado.duracao;

    duracaoFilme = (duracaoFilme.split('h')[0].padStart(2,0) + ':' + duracaoFilme.split('h')[1]).replace('min', '');
    duracao.value = duracaoFilme;


    descricao.value = filmeSelecionado.descricao;
    url.value = filmeSelecionado.cartaz;
    gambi();
    $('#container-info-filme').style.visibility = 'visible'

    
}

$('#formulario').addEventListener('submit', async (e) => {
    e.preventDefault()
    let body = {
        nome: nome.value,
        categoria: categoria.value,
        classificacao: parseInt(classificacao.value),
        duracao: duracao.value.replace(":", "h") + "min",
        descricao: descricao.value,
        cartaz: url.value,
        id: filmeSelecionado.id
    }
    console.log('entrou')
    await controller.atualizaFilme(body)
    window.location.assign('/brsasa_site')
})

//formulário chique
document.querySelectorAll(".input").forEach((element) => {
    element.addEventListener("blur", (event) => {
        if (event.target.value != "") {
            event.target.nextElementSibling.classList.add("filled");
        } else {
            event.target.nextElementSibling.classList.remove("filled");
        }
    });
});

document.querySelectorAll(".label").forEach((element) => {
    element.addEventListener("click", (event) => {
        if (event.target.value != "") {
            event.target.classList.add("filled");
            console.log(event.target.nextElementSibling.classList)
        } else {
            event.target.classList.remove("filled");
        }
    });
});

function gambi(){
    document.querySelectorAll(".input").forEach((element) => {
        if (element.value != "") {
            element.nextElementSibling.classList.add("filled");
        } else {
            element.nextElementSibling.classList.remove("filled");
        }
    });
}