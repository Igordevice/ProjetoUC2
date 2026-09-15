/**
 * catalogo.js - Lógica interativa do Catálogo de Profissionais
 * Projeto SinguLar
 */

// -----------------------------------------------------------------------------
// 1. ARRAY DE PROFISSIONAIS (SUAS IMAGENS SÃO DEFINIDAS AQUI)
// -----------------------------------------------------------------------------

const profissionais = [
    {
        id: 1,
        nome: "Dra. Camila Rocha",
        crp: "06/123456",
        // Substitua pelo caminho da sua imagem (ex: "img/camila.png")
        foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        nota: "4.9",
        tags: ["TEA", "TDAH", "Ansiedade"],
        publico: ["Adultos", "Adolescente"],
        bio: "Especialista em TEA e TDAH adulto. Abordagem sensível às necessidades neurodivergentes com foco em autonomia.",
        abordagem: "TCC",
        experiencia: "8 anos",
        sessoes: "420+",
        preco: 180,
        disponivelAgora: true,
        modalidade: "Online"
    },
    {
        id: 2,
        nome: "Dra. Beatriz Lima",
        crp: "06/234567",
        // Substitua pelo caminho da sua imagem (ex: "img/beatriz.png")
        foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80",
        nota: "4.8",
        tags: ["TEA", "Família", "Infantil"],
        publico: ["Infantil"],
        bio: "Atendimento infantil e familiar para TEA. Parceria com escolas e equipes multidisciplinares.",
        abordagem: "Psicanálise",
        experiencia: "12 anos",
        sessoes: "680+",
        preco: 160,
        disponivelAgora: true,
        modalidade: "Online"
    },
    {
        id: 3,
        nome: "Dr. Rafael Souza",
        crp: "06/345678",
        // Substitua pelo caminho da sua imagem (ex: "img/rafael.png")
        foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
        nota: "4.7",
        tags: ["TDAH", "Ansiedade", "Adultos"],
        publico: ["Adultos"],
        bio: "Especialista em TEA nível III de suporte e regulação emocional em adultos. Foco em produtividade e autoconhecimento.",
        abordagem: "ACT",
        experiencia: "6 anos",
        sessoes: "290+",
        preco: 140,
        disponivelAgora: false,
        modalidade: "Online"
    },
    {
        id: 4,
        nome: "Dra. Mariana Costa",
        crp: "06/789012",
        foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
        nota: "4.8",
        tags: ["Família", "Infantil", "TEA"],
        publico: ["Infantil"],
        bio: "Terapeuta familiar sistêmica. Atende crianças e famílias que acabaram de receber diagnóstico de TEA.",
        abordagem: "Sistêmica",
        experiencia: "10 anos",
        sessoes: "560+",
        preco: 170,
        disponivelAgora: false,
        modalidade: "Presencial"
    },
    {
        id: 5,
        nome: "Dr. Lucas Faria",
        crp: "07/890123",
        // Substitua pelo caminho da sua imagem (ex: "img/lucas.png")
        foto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
        nota: "4.7",
        tags: ["TDAH", "Ansiedade", "Adultos"],
        publico: ["Adultos"],
        bio: "Psicólogo clínico com Tea diagnosticado. Perspectiva única e validada de quem vivencia o que atende.",
        abordagem: "TCC",
        experiencia: "7 anos",
        sessoes: "340+",
        preco: 150,
        disponivelAgora: true,
        modalidade: "Online"
    },
    {
        id: 6,
        nome: "Dra. Julia Santos",
        crp: "08/678901",
        // Substitua pelo caminho da sua imagem (ex: "img/julia.png")
        foto: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
        nota: "4.6",
        tags: ["Ansiedade", "TDAH", "Adultos"],
        publico: ["Adultos"],
        bio: "Especializada e TEA com rigidez cognitiva Usa EMDR e mindfulness adaptados para hipersensibilidade sensorial.",
        abordagem: "EMDR",
        experiencia: "5 anos",
        sessoes: "198+",
        preco: 130,
        disponivelAgora: true,
        modalidade: "Online"
    }
];

// -----------------------------------------------------------------------------
// 2. CONTROLE DE ESTADO DOS FILTROS
// -----------------------------------------------------------------------------
const filtrosAtivos = {
    textoBusca: "",
    publico: "Todos",
    apenasDisponiveis: false,
    modalidade: "Todos"
};

// -----------------------------------------------------------------------------
// 3. SELEÇÃO DE ELEMENTOS DO DOM
// -----------------------------------------------------------------------------
const elementoGrade = document.getElementById("lista-profissionais");
const elementoContador = document.getElementById("contador-profissionais");
const inputBusca = document.getElementById("catalogo-busca");
const toggleDisponivel = document.getElementById("toggle-disponivel-input");
const containerFiltroPublico = document.getElementById("filtro-publico");
const containerFiltroModalidade = document.getElementById("filtro-modalidade");

// -----------------------------------------------------------------------------
// 4. MONTAGEM DOS ELEMENTOS
// -----------------------------------------------------------------------------
function renderizarTags(tags) {
    return tags.map(tag => `<span class="tag-item">${tag}</span>`).join("");
}

function criarCardHTML(profissional) {
    const ehDisponivel = profissional.disponivelAgora;

    const statusHtml = ehDisponivel
        ? `<span class="status-tag-disponivel">Disponível</span>`
        : `<span class="status-tag-indisponivel">Sem vaga esta semana</span>`;

    const botaoHtml = ehDisponivel
        ? `<a href="#agendamento" class="btn-agendar" data-nome="${profissional.nome}">Agendar →</a>`
        : `<button type="button" class="btn-espera" data-nome="${profissional.nome}">Lista de espera</button>`;

    return `
    <article class="card-profissional" data-id="${profissional.id}">
      <div>
        <div class="card-topo">
          <div class="foto-wrapper">
            <img class="card-foto" src="${profissional.foto}" alt="Foto de ${profissional.nome}">
            ${ehDisponivel ? '<span class="indicador-online-foto" title="Disponível agora"></span>' : ''}
          </div>
          <div class="card-identificacao">
            <h2 class="card-nome">${profissional.nome}</h2>
            <div class="card-crp">CRP ${profissional.crp}</div>
            <div class="card-tags">
              ${renderizarTags(profissional.tags)}
            </div>
          </div>
          <div class="card-avaliacao" aria-label="Avaliação: ${profissional.nota} de 5 estrelas">
            <span class="icone-estrela" aria-hidden="true">★</span>
            <span>${profissional.nota}</span>
          </div>
        </div>

        <p class="card-bio">${profissional.bio}</p>

        <div class="card-metricas">
          <div class="metrica-item">
            <span class="metrica-valor">${profissional.abordagem}</span>
            <span class="metrica-rotulo">Abordagem</span>
          </div>
          <div class="metrica-item">
            <span class="metrica-valor">${profissional.experiencia}</span>
            <span class="metrica-rotulo">Experiência</span>
          </div>
          <div class="metrica-item">
            <span class="metrica-valor">${profissional.sessoes}</span>
            <span class="metrica-rotulo">Sessões</span>
          </div>
        </div>
      </div>

      <div class="card-rodape">
        <div class="preco-bloco">
          <div class="preco-valor">R$${profissional.preco}<span class="preco-sufixo">/sessão</span></div>
          <div class="preco-status-info">
            ${statusHtml}
            <span class="modalidade-tag">${profissional.modalidade}</span>
          </div>
        </div>
        ${botaoHtml}
      </div>
    </article>
  `;
}

// -----------------------------------------------------------------------------
// 5. FILTRAGEM DINÂMICA
// -----------------------------------------------------------------------------
function aplicarFiltrosERenderizar() {
    const filtrados = profissionais.filter(prof => {
        const termo = filtrosAtivos.textoBusca.toLowerCase();
        const coincideNome = prof.nome.toLowerCase().includes(termo);
        const coincideBio = prof.bio.toLowerCase().includes(termo);
        const coincideTag = prof.tags.some(t => t.toLowerCase().includes(termo));
        const coincideBusca = !termo || (coincideNome || coincideBio || coincideTag);

        const coincidePublico =
            filtrosAtivos.publico === "Todos" ||
            prof.publico.includes(filtrosAtivos.publico) ||
            prof.tags.includes(filtrosAtivos.publico);

        const coincideDisponibilidade =
            !filtrosAtivos.apenasDisponiveis || prof.disponivelAgora === true;

        const coincideModalidade =
            filtrosAtivos.modalidade === "Todos" ||
            prof.modalidade.toLowerCase() === filtrosAtivos.modalidade.toLowerCase();

        return coincideBusca && coincidePublico && coincideDisponibilidade && coincideModalidade;
    });

    elementoContador.textContent = filtrados.length;

    if (filtrados.length === 0) {
        elementoGrade.innerHTML = `
      <div class="grade-vazia">
        <h3>Nenhum terapeuta encontrado</h3>
        <p>Tente ajustar os filtros ou pesquisar com termos mais genéricos.</p>
      </div>
    `;
        return;
    }

    elementoGrade.innerHTML = filtrados.map(criarCardHTML).join("");
}

// -----------------------------------------------------------------------------
// 6. EVENTOS DE INTERAÇÃO
// -----------------------------------------------------------------------------
inputBusca.addEventListener("input", (e) => {
    filtrosAtivos.textoBusca = e.target.value.trim();
    aplicarFiltrosERenderizar();
});

toggleDisponivel.addEventListener("change", (e) => {
    filtrosAtivos.apenasDisponiveis = e.target.checked;
    aplicarFiltrosERenderizar();
});

containerFiltroPublico.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-pilula");
    if (!botao) return;

    containerFiltroPublico.querySelectorAll(".btn-pilula").forEach(b => b.classList.remove("ativa"));
    botao.classList.add("ativa");

    filtrosAtivos.publico = botao.getAttribute("data-publico");
    aplicarFiltrosERenderizar();
});

containerFiltroModalidade.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-pilula");
    if (!botao) return;

    containerFiltroModalidade.querySelectorAll(".btn-pilula").forEach(b => b.classList.remove("ativa"));
    botao.classList.add("ativa");

    filtrosAtivos.modalidade = botao.getAttribute("data-modalidade");
    aplicarFiltrosERenderizar();
});

elementoGrade.addEventListener("click", (e) => {
    const botaoEspera = e.target.closest(".btn-espera");
    if (botaoEspera) {
        const nome = botaoEspera.getAttribute("data-nome");
        alert(`Você foi adicionado(a) à lista de espera de ${nome}!`);
    }
});

// Renderização inicial
aplicarFiltrosERenderizar();