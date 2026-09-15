const planos = {
    profissional: [
        {
            name: "Essencial",
            price: "R$79",
            features: [
                "Modelo Básico de Evolução: Formulário rápido e padronizado para anotações de   sessão focado no desenvolvimento TEA.",
                "Repositório de Documentos do Paciente: Espaço seguro para anexar laudos, relatórios escolares e exames anteriores.",
            ],
        },
        {
            badge: "Mais popular",
            tag: "Mais popular",
            name: "Acompanhamento",
            price: "R$159",
            features: [
                "udo do essencial + Destaque na busca de profissionais relatórios evolutivos com suporte de IA.",
                "Prontuário avançado  / escalas de avaliação do desenvolvimento.",
                "Resumo com IA Dashboard",
            ],
        },
    ],
    usuario: [
        {
            tag: "Para começar",
            name: "Gratuito",
            price: "Grátis",
            features: [
                "Rotina diária básica",
                "Bloco de notas com até 3 anotações",
                "Lembretes sem suporte de IA",
            ],
        },
        {
            badge: "Mais popular",
            tag: "Mais popular",
            name: "Essencial",
            price: "R$29",
            features: [
                "Rotina ilimitada",
                "Diário de humor",
                "Bloco de notas ilimitado",
                 "IA  atipica ( com suporte na preparo da rotina)",
                 "Descontos básicos em consultas"
            ],
        },
        {
            tag: "Completo",
            name: "Acompanhamento",
            price: "R$49",
            features: [
                "Tudo do Essencial",
                "Descontos exclusivos em consultas",
                "Prontuário e diário de progresso",
                "Descontos exclusivos e promoções  relampagos",
                "Prontuario e diario de progresso"
            ],
        },
    ],
};

const botoesToggle = document.querySelectorAll(".btn-toggle");
const cards = document.querySelectorAll("[data-plan-card]");

function renderizarPlanos(modo) {
    cards.forEach((card, indice) => {
        const plano = planos[modo][indice];
        const deveMostrar = Boolean(plano);

        card.style.display = deveMostrar ? "flex" : "none";
        card.setAttribute("aria-hidden", String(!deveMostrar));

        if (!deveMostrar) return;

        card
            .querySelector('[data-field="badge"]')
            ?.replaceChildren(plano.badge || "");
        card.querySelector('[data-field="tag"]')?.replaceChildren(plano.tag || "");
        card.querySelector('[data-field="name"]').textContent = plano.name;
        card.querySelector('[data-field="price"]').innerHTML =
            `${plano.price}${plano.price === "Grátis" ? "" : " <span>/mês</span>"}`;
        card.querySelector('[data-field="features"]').innerHTML = plano.features
            .map(
                (recurso) =>
                    `<li><span class="check ${indice === 0 ? "check-azul" : "check-verde"}">✓</span> ${recurso}</li>`,
            )
            .join("");
    });
}

renderizarPlanos("usuario");

botoesToggle.forEach((botao) => {
    botao.addEventListener("click", () => {
        const modo = botao.dataset.mode;
        botoesToggle.forEach((item) => {
            const ativo = item === botao;
            item.classList.toggle("ativo", ativo);
            item.setAttribute("aria-pressed", ativo);
        });
        renderizarPlanos(modo);
    });
});

