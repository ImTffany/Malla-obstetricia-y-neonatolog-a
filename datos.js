const malla = [

/* ==========================
   AÑO 1
========================== */

{
  anio: "I",
  semestres: [

    {
      nombre: "Semestre 1",
      ramos: [
        {
          id: "bases",
          nombre: "Bases Científicas del Funcionamiento Humano",
          estado: "pendiente",
          prereq: []
        },
        {
          id: "mental",
          nombre: "Cuidados en Salud Mental",
          estado: "pendiente",
          prereq: []
        },
        {
          id: "fundamentos",
          nombre: "Fundamentos de la Matronería",
          estado: "pendiente",
          prereq: []
        },
        {
          id: "genero",
          nombre: "Salud con Perspectiva de Género",
          estado: "pendiente",
          prereq: []
        }
      ]
    },

    {
      nombre: "Semestre 2",
      ramos: [
        {
          id: "morfo1",
          nombre: "Morfofunción I",
          estado: "bloqueado",
          prereq: ["bases"]
        },
        {
          id: "sexual",
          nombre: "Salud Sexual Integral",
          estado: "bloqueado",
          prereq: ["genero"]
        },
        {
          id: "pam",
          nombre: "Clínica PAM",
          estado: "bloqueado",
          prereq: ["fundamentos"]
        },
        {
          id: "ingles1",
          nombre: "Inglés General I",
          estado: "pendiente",
          prereq: []
        }
      ]
    }

  ]
},

/* ==========================
   AÑO 2 (BASE)
========================== */

{
  anio: "II",
  semestres: [

    {
      nombre: "Semestre 3",
      ramos: [
        {
          id: "morfo2",
          nombre: "Morfofunción II",
          estado: "bloqueado",
          prereq: ["morfo1"]
        },
        {
          id: "rn",
          nombre: "Cuidado Integral RN Sano",
          estado: "bloqueado",
          prereq: ["pam"]
        },
        {
          id: "puerperio",
          nombre: "Periodo Grávido Puerperal",
          estado: "bloqueado",
          prereq: ["pam"]
        }
      ]
    }

  ]
}

];
