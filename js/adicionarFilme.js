import * as controller from "./controller.js";

// Formulario
const form = document.querySelector("#formulario");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { nome, categoria, classificacao, duracao, descricao, cartaz } =
        e.target;

    let duracao_format = duracao.value.replace(":", "h") + "min";

    const novoFilme = {
        nome: nome.value,
        categoria: categoria.value,
        classificacao: +classificacao.value,
        duracao: duracao_format,
        descricao: descricao.value,
        cartaz: cartaz.value,
    };

    controller
        .adicionaFilme(novoFilme)
    window.location.assign("/index.html")
});

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

