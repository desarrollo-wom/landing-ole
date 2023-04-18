(function () {



    let btnAnimar = document.querySelector("#btn-animar");
    let activeButton = "esc1";

    let changeActive = {
        esc1: "out1",
        esc2: "out2",
        esc3: "out3",
        esc4: "out4",
        esc5: "out5",
        esc6: "",
    }

    document.addEventListener("keydown", function (eventKd) {
        /*console.log("presionar");
        console.log(eventKd);*/
        if (eventKd.keyCode == 32) {
            if (!event.target.matches('input[type="text"]')) {
                // if(!event.target.matches('button')){
                const activeElement = document.activeElement; // Obtener el elemento activo
                activeElement.blur(); // Quitar el foco del elemento activo
                document.body.focus();
                if (localStorage.getItem("totopos-ole-btn-animar")) {
                    localBtnAnimar = localStorage.getItem("totopos-ole-btn-animar");
                    localStorage.setItem("totopos-ole-btn-animar", true);
                } else {
                    localStorage.setItem("totopos-ole-btn-animar", true);
                }
                // }
            }
        }
    });

    document.addEventListener("keyup", function (eventKu) {
        /*console.log("soltar");
        console.log(eventKu);*/
        if (eventKu.keyCode == 32) {
            if (!event.target.matches('input[type="text"]')) {
                const activeElement = document.activeElement; // Obtener el elemento activo
                activeElement.blur(); // Quitar el foco del elemento activo
                document.body.focus();
                if (localStorage.getItem("totopos-ole-btn-animar")) {
                    localBtnAnimar = localStorage.getItem("totopos-ole-btn-animar");
                    localStorage.setItem("totopos-ole-btn-animar", false);
                } else {
                    localStorage.setItem("totopos-ole-btn-animar", true);
                }
            }
        }
    });


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

    let soundEfects = document.querySelectorAll(".cont-btn button");

    soundEfects.forEach(function (soundEfect) {
        soundEfect.addEventListener("click", function () {
            var audio = document.querySelector(`audio#${this.id}`);
            console.log(audio);
            // Agregar un controlador de eventos clic al botón
            // button.addEventListener("click", function () {
            // Comprobar si el audio está reproduciéndose actualmente
            if (audio.paused) {
                // Si el audio está en pausa, reproducirlo
                audio.play();
            } else {
                // Si el audio se está reproduciendo, detenerlo y volver al inicio
                audio.pause();
                audio.currentTime = 0;
                audio.play();
            }
            // });
        });
    });

    let frasesGenericas = document.querySelectorAll(".cont-btn-frases button");

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

    let btnStages = document.querySelectorAll("button.cont-btn-escenarios");

    btnStages.forEach(function (btnStage) {
        btnStage.addEventListener("click", function () {
            console.log(activeButton);
            document.getElementById(changeActive[activeButton]).classList.remove("active");
            document.getElementById(changeActive[this.id]).classList.add("active");
            document.getElementById("out6").classList.add("active");
            activeButton = this.id;
            localStorage.setItem("totopos-ole-escenario", this.id);
        });
    });

    function capturarMensaje(mensaje) {
        const texto = mensaje;

        localStorageText = texto.replace(/(\S+\s*){3}/g, "$&<br>");

        localStorage.setItem("totopos-ole-enviar-texto", localStorageText);
        document.querySelector("#mensaje").value = "";
        document.querySelector("#mensaje").blur();
    }

    let btnSnaps = document.querySelectorAll(".cont-btn-cierres");

    btnSnaps.forEach(function (btnSnap) {
        if (btnSnap.id === changeActive[activeButton]) {
            btnSnap.classList.add("active");
        }
        if (btnSnap.id === "out6") {
            btnSnap.classList.add("active");
        }

        btnSnap.addEventListener("click", function () {
            localStorage.removeItem("totopos-ole-cierre");
            this.classList.remove("active");
            localStorage.setItem("totopos-ole-cierre", this.id);
        });
    });

    // Purgar el local storage
    localStorage.removeItem("totopos-ole-escenario");
    localStorage.removeItem("totopos-ole-cierre");

})();