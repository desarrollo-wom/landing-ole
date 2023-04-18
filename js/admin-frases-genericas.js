(function () {
    let btnAnimar = document.querySelector("#btn-animar");

    btnAnimar.addEventListener('mousedown', function () {
        if (localStorage.getItem("totopos-ole-btn-animar")) {
            localBtnAnimar = localStorage.getItem("totopos-ole-btn-animar");
            localStorage.setItem("totopos-ole-btn-animar", true);
        } else {
            localStorage.setItem("totopos-ole-btn-animar", true);
        }
    });

    btnAnimar.addEventListener('mouseup', function () {
        if (localStorage.getItem("totopos-ole-btn-animar")) {
            localBtnAnimar = localStorage.getItem("totopos-ole-btn-animar");
            localStorage.setItem("totopos-ole-btn-animar", false);
        } else {
            localStorage.setItem("totopos-ole-btn-animar", true);
        }
    });

    let btnMensaje = document.querySelector(".send-message input[type='submit']");

    let frasesGenericas = document.querySelectorAll(".cont-btn button");

    frasesGenericas.forEach(function (fraseGenerica) {
        fraseGenerica.addEventListener("click", function () {
            capturarMensaje(this.innerText);
        });
    });

    btnMensaje.addEventListener("click", () => {
        capturarMensaje(document.querySelector("#mensaje").value);
    });

    document.querySelector("#mensaje").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            capturarMensaje(this.value);
        }
    });

    btnEscenario2 = document.querySelector("#esc2");
    btnEscenario2.addEventListener("click", function () {
        localStorage.removeItem("totopos-ole-escenario");
        localStorage.setItem("totopos-ole-escenario", this.id);
    });

    function capturarMensaje(mensaje) {
        const texto = mensaje;
        const palabras = texto.split(" ");
        const lineas = [];

        let localStorageText = "";

        for (let i = 0; i < palabras.length; i += 4) {
            lineas.push(palabras.slice(i, i + 4).join(" "));
        }

        lineas.forEach((linea, index) => {
            const lineaDiv = document.createElement("div");
            lineaDiv.innerText = linea;
            lineaDiv.classList.add("typewriter");
            lineaDiv.style.animationDelay = `${index * 1}s`;
            lineaDiv.style.animationTimingFunction = `steps(${linea.length}, end)`;
            localStorageText += lineaDiv.outerHTML;
        });

        localStorage.setItem("totopos-ole-enviar-texto", localStorageText);
    }

})();