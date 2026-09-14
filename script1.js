const opcoes = document.querySelectorAll(".opcao");

opcoes.forEach(opcao => {

    opcao.addEventListener("click", () => {

        // Remove a seleção de todas
        opcoes.forEach(item => {
            item.classList.remove("selecionada");
        });

        // Seleciona a clicada
        opcao.classList.add("selecionada");

    });

});