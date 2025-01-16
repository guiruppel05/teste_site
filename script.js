document.addEventListener("DOMContentLoaded", function () {
    var popup = document.getElementById("popup");
    var closeButton = document.querySelector(".close-button");

    // Mostrar o popup quando a página carrega
    popup.style.display = "flex";

    // Fechar o popup quando o botão de fechar é clicado
    closeButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Fechar o popup quando o usuário clica fora do conteúdo do popup
    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
