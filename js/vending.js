(function () {



    let contenedorVending = document.querySelector(".contenedor-vending");
    let containerEmpaque = document.querySelector(".container-empaque");
    let textoMaquina = document.querySelector("#texto-maquina-escribir");
    let bgMuppy = document.querySelector(".container-empaque");
    let elem = document.querySelector('.parte1');
    let part2 = document.querySelector('.parte2');

    contenedorVending.setAttribute("data-current", "stage");

    const stage_colors = {
        esc1: "#ff7c01",
        esc2: "#ff3528",
        esc3: "#52ba3d",
        esc4: "#01aeff",
        esc5: "#813987",
    }

    const out_colors = {
        out1: "#ff7c01",
        out2: "#ff3528",
        out3: "#52ba3d",
        out4: "#01aeff",
        out5: "#813987",
    }

    const stage_character = {
        esc1: ["totopo1.png", "totopo.png"],
        esc2: ["totopo21.png", "totopo2.png"],
        esc3: ["totopo21.png", "totopo2.png"],
        esc4: ["totopo31.png", "totopo3.png"],
        esc5: ["totopo41.png", "totopo4.png"],
    }

    const outputDummies = {
        out1: ["cierre2.png", "particulas.png", "maiz.png"],
        out2: ["cierre1.png", "aji.png", "queso.png"],
        out3: ["cierre3.png", "aji.png", "limon.png"],
        out4: ["cierre4.png", "particulas.png", "maiz.png"],
        out5: ["cierre5.png", "limon1.png", "aguacate.png"],
        out6: ["cierre6.png", ,],
    }

    containerEmpaque.classList.add("esc1");

    window.addEventListener('storage', function (e) {
        if (e.key === 'totopos-ole-btn-animar' && e.newValue !== e.oldValue) {
            if (e.newValue === "true") {
                bgMuppy.classList.add("animarBG");
                elem.classList.add("animada");
                part2.classList.add("animada1");
            }
            if (e.newValue === "false") {
                bgMuppy.classList.remove("animarBG");
                elem.classList.remove("animada");
                part2.classList.remove("animada1");
            }
        }

        if (e.key === 'totopos-ole-enviar-texto' && e.newValue !== e.oldValue) {

            if (document.querySelector("#mostrar-texto-personalizado")) {
                contenedorVending.removeChild(document.querySelector("#mostrar-texto-personalizado"));
            }

            let showMessage = document.createElement("p");
            showMessage.innerHTML = e.newValue;
            showMessage.id = "mostrar-texto-personalizado";

            contenedorVending.appendChild(showMessage);

            this.setTimeout(function () {
                showMessage.classList.add("entrada-texto-personalizado");
            }, 200);

            setTimeout(function () {
                showMessage.classList.remove("entrada-texto-personalizado");
            }, 5000);

            setTimeout(function () {
                localStorage.removeItem("totopos-ole-enviar-texto");
                contenedorVending.removeChild(showMessage);
            }, 6000);

            localStorage.removeItem('totopos-ole-enviar-texto');
        }

        if (e.key === 'totopos-ole-escenario' && e.newValue !== e.oldValue && e.newValue !== "empty") {

            document.querySelector(".cabecera-vending").classList.remove("out6");
            document.querySelector(".footer-vending").classList.remove("out6");
            document.querySelector("img.texto-cierre").src = "img/texto-cierre.png";

            let currentStage = contenedorVending.getAttribute("data-current");

            if (currentStage === "out") {
                contenedorVending.classList.remove("animar_cierre");
                contenedorVending.setAttribute("data-current", "stage");
                let images = document.querySelectorAll(".container-empaque img");
                let bgMigas = containerEmpaque;
                bgMigas.classList.remove("esc1");
                bgMigas.classList.remove("esc2");
                bgMigas.classList.remove("esc3");
                bgMigas.classList.remove("esc4");
                bgMigas.classList.remove("esc5");

                setTimeout(function () {
                    images[0].src = "img/" + stage_character[e.newValue][0];
                    images[1].src = "img/" + stage_character[e.newValue][1];
                    cambiarFondo(e.newValue);
                    bgMigas.classList.add(e.newValue);
                }, 750);

            }
            else {
                // Cambiar personaje
                cambiarPersonaje(e.newValue);

                // Cambiar fondo
                cambiarFondo(e.newValue);
            }
            localStorage.setItem("totopos-ole-escenario", "empty");
        }

        if (e.key === 'totopos-ole-cierre' && (e.newValue !== e.oldValue) && (e.newValue !== "empty") && (e.newValue !== null)) {

            let currentStage = contenedorVending.getAttribute("data-current");

            if (currentStage === "out") {
                document.querySelector(".cabecera-vending").classList.remove("out6");
                document.querySelector(".footer-vending").classList.remove("out6");
            } else {
                contenedorVending.setAttribute("data-current", "out");
            }

            setTimeout(function () {
                cambiarFondo(e.newValue);
            }, 750);

            if (e.newValue !== "out6") {
                document.querySelector(".container-empaque-cierre").className = "container-empaque-cierre " + (e.newValue);
                // document.querySelector(".container-empaque-cierre").classList.add(e.newValue);
                // document.querySelector(".container-empaque-cierre").classList.remove(e.oldValue);
            } else {
                setTimeout(function () {
                    document.querySelector(".container-empaque-cierre").className = "container-empaque-cierre " + (e.newValue);
                    // document.querySelector(".container-empaque-cierre").classList.add(e.newValue);
                    // document.querySelector(".container-empaque-cierre").classList.remove(e.oldValue);
                }, 700);
            }



            let images = document.querySelectorAll(".container-empaque-cierre img:nth-child(2)");
            images.forEach(function (image) { image.classList.add("cierre") });
            setTimeout(function () {
                images[0].src = "img/" + (outputDummies[e.newValue][0] === undefined ? "" : outputDummies[e.newValue][0]);
                document.querySelector(".container-empaque-cierre img:first-child").src = "img/" + outputDummies[e.newValue][1];
                document.querySelector(".container-empaque-cierre img:last-child").src = "img/" + outputDummies[e.newValue][2];

                contenedorVending.classList.add("animar_cierre");
            }, 500);

            setTimeout(function () {
                images.forEach(function (image) {
                    image.classList.add("cierre-end")
                });
            }, 800);

            setTimeout(function () {
                images.forEach(function (image) {
                    image.classList.remove("cierre-end");
                    image.classList.remove("cierre");
                });
            }, 1500);

            if (e.newValue !== "out6") {

                document.querySelector("img.texto-cierre").src = "img/texto-cierre.png";

            } else {
                let currentStage = contenedorVending.getAttribute("data-current");

                if (currentStage !== "out") {
                    contenedorVending.classList.remove("animar_cierre");

                } else {
                    contenedorVending.classList.add("out_transition");
                    this.setTimeout(function () {
                        contenedorVending.classList.remove("out_transition");
                    }, 700);
                }

                setTimeout(function () {

                    contenedorVending.classList.add("animar_cierre");
                    setTimeout(function () {
                        document.querySelector(".cabecera-vending").classList.add("out6");
                        document.querySelector(".footer-vending").classList.add("out6");
                    }, 700);
                    let current_color = contenedorVending.style.backgroundColor;
                    let stage_color = "#ffe500";
                    let images = document.querySelectorAll(".container-empaque-cierre img:nth-child(2)");
                    images.forEach(function (image) { image.classList.add("cierre") });

                    images[0].src = "img/" + outputDummies[e.newValue][0];
                    document.querySelector(".container-empaque-cierre img:first-child").src = "img/" + outputDummies[e.newValue][1];
                    document.querySelector(".container-empaque-cierre img:last-child").src = "img/" + outputDummies[e.newValue][2];

                    let keyframes = `@keyframes transition${e.newValue} {`;
                    let des_count = 99;
                    let percent = 0;

                    for (let i = 0; i < 21; i++) {
                        des_count = 99 - i * 11;
                        if (i > 9) {
                            des_count = 99 - ((i - 10) * 11);
                            keyframes += `${percent}% { background: url(img/pattern-final.png), linear-gradient(45deg, ${current_color} 0%, ${stage_color} ${des_count}%);}`;
                        } else {
                            keyframes += `${percent}% { background: url(img/pattern-final.png), linear-gradient(45deg, ${current_color} ${des_count}%, ${stage_color} 100%);}`;
                        }
                        percent += 5;
                    }
                    keyframes += "}";

                    const styleElement = document.querySelector("#auto-generate");
                    styleElement.innerHTML = keyframes;
                    contenedorVending.style.animation = `transition${e.newValue} .7s ease-in-out forwards`;
                    contenedorVending.style.backgroundColor = stage_color;

                    //document.querySelector("img.texto-cierre").src = "img/texto-cierre-final.png";

                    containerEmpaque.classList.remove("cierre-activo");


                }, 800);
            }
            localStorage.setItem("totopos-ole-cierre", "empty");
        }
    });

    function cambiarFondo(colors) {
        let current_color = contenedorVending.style.backgroundColor;
        let stage_color = stage_colors[colors] ? stage_colors[colors] : out_colors[colors];

        // Si la regla @keyframes no existe, crearla
        let keyframes = `@keyframes transition${colors} {`;
        let des_count = 99;
        let percent = 0;

        for (let i = 0; i < 21; i++) {
            des_count = 99 - i * 11;
            if (i > 9) {
                des_count = 99 - ((i - 10) * 11);
                keyframes += `${percent}% { background: url(img/pattern-bg.png), linear-gradient(45deg, ${current_color} 0%, ${stage_color} ${des_count}%);}`;
            } else {
                keyframes += `${percent}% { background: url(img/pattern-bg.png), linear-gradient(45deg, ${current_color} ${des_count}%, ${stage_color} 100%);}`;
            }
            percent += 5;
        }
        keyframes += "}";

        const styleElement = document.querySelector("#auto-generate");
        styleElement.innerHTML = keyframes;
        contenedorVending.style.animation = `transition${colors} .7s ease-in-out forwards`;
        contenedorVending.style.backgroundColor = stage_color;
    }

    function cambiarPersonaje(character) {
        let bgMigas = containerEmpaque;
        bgMigas.classList.remove("esc1");
        bgMigas.classList.remove("esc2");
        bgMigas.classList.remove("esc3");
        bgMigas.classList.remove("esc4");
        bgMigas.classList.remove("esc5");

        containerEmpaque.classList.add("salida");
        let images = document.querySelectorAll(".container-empaque img");

        setTimeout(function () {
            images[0].src = "img/" + stage_character[character][0];
            images[1].src = "img/" + stage_character[character][1];
        }, 750);

        setTimeout(function () {
            containerEmpaque.classList.add("entrada");
        }, 800);

        setTimeout(function () {
            images.forEach(function (image) {
                containerEmpaque.classList.remove("entrada");
                containerEmpaque.classList.remove("salida");
            });
        }, 1000);

        bgMigas.classList.add(character);
    }


})();