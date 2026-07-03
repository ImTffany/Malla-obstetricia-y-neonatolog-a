
/* ==========================
   ESTADO GLOBAL
========================== */

let estado = JSON.parse(localStorage.getItem("mallaEstado")) || {};

/* ==========================
   RENDER MALLA
========================== */

const contenedor = document.getElementById("malla");

function renderMalla() {

    contenedor.innerHTML = "";

    malla.forEach(anio => {

        const anioDiv = document.createElement("div");
        anioDiv.classList.add("anio");

        const tituloAnio = document.createElement("h2");
        tituloAnio.textContent = `AÑO ${anio.anio}`;

        const semestresDiv = document.createElement("div");
        semestresDiv.classList.add("semestres");

        anio.semestres.forEach(sem => {

            const semDiv = document.createElement("div");
            semDiv.classList.add("semestre");

            const tituloSem = document.createElement("h3");
            tituloSem.textContent = sem.nombre;

            semDiv.appendChild(tituloSem);

            sem.ramos.forEach(ramo => {

                const ramoDiv = document.createElement("div");
                ramoDiv.classList.add("ramo");

                ramoDiv.dataset.id = ramo.id;
                ramoDiv.textContent = ramo.nombre;

                // estado inicial
                if (estado[ramo.id]) {
                    ramoDiv.classList.add("aprobado");
                } else if (!cumpleRequisitos(ramo)) {
                    ramoDiv.classList.add("bloqueado");
                } else {
                    ramoDiv.classList.add("pendiente");
                }

                // click
                ramoDiv.addEventListener("click", () => toggleRamo(ramo));

                semDiv.appendChild(ramoDiv);

            });

            semestresDiv.appendChild(semDiv);
        });

        anioDiv.appendChild(tituloAnio);
        anioDiv.appendChild(semestresDiv);

        contenedor.appendChild(anioDiv);
    });

    actualizarUI();
}

/* ==========================
   PRERREQUISITOS
========================== */

function cumpleRequisitos(ramo) {

    return ramo.prereq.every(id => estado[id]);
}

/* ==========================
   TOGGLE RAMO
========================== */

function toggleRamo(ramo) {

    const aprobado = estado[ramo.id];

    if (aprobado) {
        delete estado[ramo.id];
    } else {

        if (!cumpleRequisitos(ramo)) {
            mostrarToast("Aún no cumples los requisitos");
            mostrarModal(ramo);
            return;
        }

        estado[ramo.id] = true;

        lanzarConfeti();
    }

    guardar();
    renderMalla();
}

/* ==========================
   GUARDADO
========================== */

function guardar() {
    localStorage.setItem("mallaEstado", JSON.stringify(estado));
}

/* ==========================
   PROGRESO
========================== */

function actualizarUI() {

    const total = document.querySelectorAll(".ramo").length;
    const aprobados = document.querySelectorAll(".ramo.aprobado").length;

    const porcentaje = Math.round((aprobados / total) * 100);

    document.getElementById("porcentaje").textContent = porcentaje + "%";
    document.getElementById("ramosAprobados").textContent = `${aprobados} / ${total}`;

    document.getElementById("progresoBarra").style.width = porcentaje + "%";
}

/* ==========================
   CONFETI
========================== */

function lanzarConfeti() {

    const colores = ["#9B1831", "#C73E5D", "#ffeaa7", "#ffffff"];

    for (let i = 0; i < 30; i++) {

        const c = document.createElement("div");
        c.classList.add("confeti");

        c.style.left = Math.random() * 100 + "vw";
        c.style.background = colores[Math.floor(Math.random() * colores.length)];
        c.style.animationDuration = (1 + Math.random()) + "s";

        document.body.appendChild(c);

        setTimeout(() => c.remove(), 2000);
    }
}

/* ==========================
   TOAST
========================== */

function mostrarToast(msg) {

    const toast = document.getElementById("toast");

    toast.textContent = msg;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

/* ==========================
   MODAL BLOQUEADO
========================== */

function mostrarModal(ramo) {

    const modal = document.getElementById("modalBloqueado");

    modal.innerHTML = `
        <div style="background:white; padding:20px; border-radius:16px; max-width:300px;">
            <h3>Ramo bloqueado</h3>
            <p>Necesitas aprobar:</p>
            <ul>
                ${ramo.prereq.map(id => `<li>${id}</li>`).join("")}
            </ul>
        </div>
    `;

    modal.classList.add("show");

    modal.onclick = () => modal.classList.remove("show");
}

/* ==========================
   BOTÓN VOLVER ARRIBA
========================== */

const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
});

btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================
   INIT
========================== */

renderMalla();

function buscarRamoPorId(id) {
    for (const anio of malla) {
        for (const sem of anio.semestres) {
            for (const r of sem.ramos) {
                if (r.id === id) return r;
            }
        }
    }
    return null;
}
${ramo.prereq.map(id => {
    const r = buscarRamoPorId(id);
    return `<li>${r ? r.nombre : id}</li>`;
}).join("")}

document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("¿Seguro que quieres reiniciar toda la malla?")) {
        localStorage.removeItem("mallaEstado");
        estado = {};
        renderMalla();
    }
});

document.getElementById("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
