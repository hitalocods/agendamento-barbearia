document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente carregado!");

    const WHATSAPP_NUMBER = "5586999540408";
    const HORARIOS_PADRAO = ["09:00", "10:00", "14:00", "15:00"];
    const DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let selecionado = {
        barbeiro: null,
        dia: null,
        horario: null,
    };

    const barbeiros = document.querySelectorAll(".barbeiro-mini-card");
    const diasContainer = document.getElementById("dias-da-semana");
    const horariosContainer = document.getElementById("horarios");
    const btnAgendar = document.getElementById("btn-agendar");

    function configurarBarbeiros() {
        barbeiros.forEach(barbeiro => {
            barbeiro.addEventListener("click", () => {
                barbeiros.forEach(b => b.classList.remove("selecionado"));
                barbeiro.classList.add("selecionado");
                selecionado.barbeiro = barbeiro.dataset.nome;
                console.log(`Barbeiro selecionado: ${selecionado.barbeiro}`);
            });
        });
    }

    function gerarDias() {
        diasContainer.innerHTML = "";
        DIAS_SEMANA.forEach(dia => {
            const divDia = document.createElement("div");
            divDia.classList.add("dia");
            divDia.textContent = dia;

            divDia.addEventListener("click", () => {
                if (!selecionado.barbeiro) {
                    alert("Por favor, selecione um barbeiro primeiro!");
                    return;
                }
                document.querySelectorAll(".dia").forEach(d => d.classList.remove("selecionado"));
                divDia.classList.add("selecionado");
                selecionado.dia = dia;
                gerarHorarios();
            });

            diasContainer.appendChild(divDia);
        });
        console.log("Dias gerados:", DIAS_SEMANA);
    }

    function gerarHorarios() {
        horariosContainer.innerHTML = "";
        HORARIOS_PADRAO.forEach(horario => {
            const divHorario = document.createElement("div");
            divHorario.classList.add("horario");
            divHorario.textContent = horario;

            divHorario.addEventListener("click", () => {
                document.querySelectorAll(".horario").forEach(h => h.classList.remove("selecionado"));
                divHorario.classList.add("selecionado");
                selecionado.horario = horario;
                console.log(`Horário selecionado: ${selecionado.horario}`);
            });

            horariosContainer.appendChild(divHorario);
        });
        console.log("Horários gerados:", HORARIOS_PADRAO);
    }

    btnAgendar.addEventListener("click", () => {
        if (!selecionado.barbeiro || !selecionado.dia || !selecionado.horario) {
            alert("Por favor, selecione um barbeiro, um dia e um horário!");
            return;
        }

        const mensagem = `Olá! Quero agendar com ${selecionado.barbeiro} - ${selecionado.dia} - ${selecionado.horario}`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
        console.log("Mensagem gerada para WhatsApp:", mensagem);
        window.open(url, "_blank");
    });

    configurarBarbeiros();
    gerarDias();
});
