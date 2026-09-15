document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. TROCA DE ABAS E UI BÁSICA
    // ==========================================
    const botoesAba = document.querySelectorAll(".menu-abas .aba");
    const conteudosAba = document.querySelectorAll(".conteudo-aba");

    botoesAba.forEach(botao => {
        botao.addEventListener("click", function() {
            botoesAba.forEach(b => b.classList.remove("ativa"));
            conteudosAba.forEach(c => c.classList.remove("ativa"));
            this.classList.add("ativa");
            document.getElementById(this.getAttribute("data-alvo")).classList.add("ativa");
        });
    });

    // ==========================================
    // 2. MODO ESCURO E MENU MOBILE
    // ==========================================
    const btnDarkMode = document.getElementById("btn-dark-mode");
    const body = document.body;
    
    // Função para desenhar a tag <span> certa dependendo do modo
    function atualizarIconeDark() {
        if (body.classList.contains("dark-mode")) {
            btnDarkMode.innerHTML = '<span class="akar-icons--sun"></span>';
        } else {
            btnDarkMode.innerHTML = '<span class="ant-design--moon-filled"></span>';
        }
    }

    if(localStorage.getItem("modo-escuro") === "sim") {
        body.classList.add("dark-mode");
    }
    
    // Já desenha o ícone correto assim que o site abre
    atualizarIconeDark();

    btnDarkMode.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if(body.classList.contains("dark-mode")) {
            localStorage.setItem("modo-escuro", "sim");
        } else {
            localStorage.setItem("modo-escuro", "nao");
        }
        
        // Atualiza a imagem do botão (Sol ou Lua)
        atualizarIconeDark();
        
        // MÁGICA DO DARK MODE NOS GRÁFICOS: 
        // Se mudou o tema e tem paciente aberto, redesenha os gráficos com a cor nova!
        if (pacienteAtual) {
            atualizarPainelPrincipal(pacienteAtual);
        }
    });

    const btnMenuMobile = document.getElementById("btn-menu-mobile");
    const sidebar = document.getElementById("sidebar");
    btnMenuMobile.addEventListener("click", () => sidebar.classList.toggle("aberta"));


    // ==========================================
    // 3. BANCO DE DADOS COMPLETO
    // ==========================================
    const pacientes = [
        { 
            nome: "Larissa M.", diag: "TEA Nível 1", prog: 78, cor: "verde", foto: "imagens/larissa.jpeg", detalhes: "TEA Nível 1 · 24 anos · desde Mar 2026",
            metricas: [78, 58, 37, 7], 
            graficos: { sub: [15, 12, 8, 5], obj: [60, 65, 80, 85], aval: [8, 5, 3], plano: [60, 25, 15] },
            ia: { atencao: ["Sobrecarga recorrente às segundas-feiras."], progressos: ["78% de aderência à rotina de regulação."] },
            observacoes: [
                { data: "30 Ago", texto: "Observar padrão de sobrecarga recorrente às segundas. Possível relação com acúmulo do final de semana." },
                { data: "20 Ago", texto: "Aumento do Modo Proteção em 3 dias consecutivos." }
            ],
            relatorios: [
                { tipo: "Sessão", data: "28 Ago 2026", texto: "Larissa relatou melhora significativa no manejo das transições. Utilizou pausas sensoriais do app de forma autônoma em 4 ocasiões." },
                { tipo: "Avaliação", data: "14 Ago 2026", texto: "Sessão focada em regulação emocional pós-sobrecarga. Larissa demonstrou capacidade crescente de identificar sinais precursores de meltdown." },
                { tipo: "Sessão", data: "01 Ago 2026", texto: "Revisão de metas do trimestre. Atingiu 3 de 4 metas funcionais. Nova meta: aumentar tolerância a ambientes barulhentos." }
            ]
        },
        { 
            nome: "Tomás R.", diag: "TEA Nível 2 + TDAH", prog: 65, cor: "amarelo", foto: "imagens/tomas.jpeg", detalhes: "TEA Nível 2 + TDAH · 19 anos · desde Jan 2026",
            metricas: [45, 72, 65, 30], 
            graficos: { sub: [22, 18, 5, 10], obj: [40, 45, 55, 60], aval: [10, 8, 2], plano: [40, 40, 20] },
            ia: { atencao: ["Picos de desatenção observados durante tarefas longas.", "Dificuldade na adesão da medicação."], progressos: ["Melhora de 15% na organização escolar."] },
            observacoes: [
                { data: "15 Set", texto: "Tomás relatou que esqueceu a medicação 2 vezes na semana." }
            ],
            relatorios: [
                { tipo: "Sessão", data: "12 Set 2026", texto: "Trabalhamos técnicas de Pomodoro para auxiliar no foco aos estudos. Tomás se mostrou receptivo, mas ainda impulsivo nas respostas." },
                { tipo: "Contato Familiar", data: "05 Set 2026", texto: "Mãe relatou que a hiperatividade motora aumentou no período noturno." }
            ]
        },
        { 
            nome: "Fernanda K.", diag: "Mãe do Pedro - TEA Nível 1", prog: 85, cor: "verde", foto: "imagens/fernanda.jpeg", detalhes: "Pedro - TEA Nível 1 · 12 anos · desde Jul 2025",
            metricas: [85, 30, 20, 5], 
            graficos: { sub: [8, 5, 20, 2], obj: [70, 75, 80, 85], aval: [2, 12, 6], plano: [75, 20, 5] },
            ia: { atencao: ["Relato de bruxismo noturno (ansiedade somatizada)."], progressos: ["Redução drástica nas crises de pânico (nenhuma nos últimos 30 dias)."] },
            observacoes: [
                { data: "02 Set", texto: "Pedro relatou ter conseguido fazer a apresentação do trabalho escolar sem bloqueios." }
            ],
            relatorios: [
                { tipo: "Avaliação", data: "01 Set 2026", texto: "Pedro apresenta excelente evolução no quadro de ansiedade generalizada. Exercícios de respiração diafragmática estão bem consolidados." }
            ]
        },
            { 
            nome: "Lucas T.", diag: "TEA + Ansiedade Social", prog: 85, cor: "azul", foto: "imagens/lucas.jpg", detalhes: "TEA + Ansiedade Social · 22 anos · desde Mai 2026",
            metricas: [20, 85, 60, 45], 
            graficos: { sub: [25, 20, 15, 10], obj: [30, 35, 30, 40], aval: [5, 2, 15], plano: [30, 10, 60] },
            ia: { atencao: ["Isolamento social severo nas últimas duas semanas.", "Alta taxa de esquiva em situações acadêmicas."], progressos: ["Conseguiu manter contato visual com o atendente da padaria."] },
            observacoes: [
                { data: "10 Set", texto: "Faltou à aula de sexta-feira devido à ansiedade antecipatória." }
            ],
            relatorios: [
                { tipo: "Sessão", data: "08 Set 2026", texto: "Sessão difícil. Lucas demonstrou muita esquiva e mutismo seletivo parcial. Focamos em técnicas de segurança e ancoragem." },
                { tipo: "Sessão", data: "01 Set 2026", texto: "Iniciamos mapeamento de gatilhos sociais na faculdade." }
            ]
        }
    ];

    let pacienteAtual = null; 
    let chartS, chartO, chartA, chartP; 

    // ==========================================
    // 4. RENDERIZAÇÃO DINÂMICA DE TODA A TELA
    // ==========================================
    const tituloPaciente = document.querySelector(".info-paciente-aberto h2");
    const detalhesPaciente = document.querySelector(".info-paciente-aberto p");
    const fotoPaciente = document.querySelector(".foto-grande");
    
    const containerRelatorios = document.getElementById("container-relatorios");
    const contadorRelatorios = document.getElementById("contador-relatorios");
    const containerObs = document.getElementById("container-observacoes");

    function atualizarPainelPrincipal(paciente) {
        pacienteAtual = paciente; 

        // 1. Atualiza Cabeçalho
        tituloPaciente.textContent = paciente.nome;
        detalhesPaciente.textContent = paciente.detalhes;
        fotoPaciente.src = paciente.foto;

        // 2. Atualiza Relatórios
        containerRelatorios.innerHTML = ""; 
        paciente.relatorios.forEach(relatorio => {
            containerRelatorios.innerHTML += `
                <li class="cartao-relatorio">
                    <div class="cabecalho-relatorio">
                        <span class="tag-tipo">${relatorio.tipo}</span>
                        <span class="data-relatorio">${relatorio.data}</span>
                    </div>
                    <p class="texto-relatorio">${relatorio.texto}</p>
                </li>
            `;
        });
        contadorRelatorios.textContent = `${paciente.relatorios.length} relatórios registrados`;

        // 3. Atualiza Observações
        containerObs.innerHTML = "";
        paciente.observacoes.forEach(obs => {
            containerObs.innerHTML += `
                <li class="item-timeline">
                    <div class="linha-decorativa verde-agua"></div>
                    <div class="conteudo-obs">
                        <span class="data-obs">${obs.data}</span>
                        <p>${obs.texto}</p>
                    </div>
                </li>
            `;
        });

        // 4. Atualiza Bolinhas de Métricas
        const bolinhas = document.querySelectorAll('.circulo-porcentagem');
        if(bolinhas.length === 4) {
            bolinhas[0].textContent = `${paciente.metricas[0]}%`;
            bolinhas[1].textContent = `${paciente.metricas[1]}%`;
            bolinhas[2].textContent = `${paciente.metricas[2]}%`;
            bolinhas[3].textContent = `${paciente.metricas[3]}%`;
        }

        // 5. Atualiza Resumo IA
        document.querySelector('.cartao-ia.atencao ul').innerHTML = paciente.ia.atencao.map(i => `<li>${i}</li>`).join('');
        document.querySelector('.cartao-ia.progressos ul').innerHTML = paciente.ia.progressos.map(i => `<li>${i}</li>`).join('');

        // 6. Atualiza Gráficos 
        if(chartS) chartS.destroy();
        if(chartO) chartO.destroy();
        if(chartA) chartA.destroy();
        if(chartP) chartP.destroy();

        // Verifica se o Dark Mode está ativo para alterar a cor do texto e das grades do Chart.js
        const isDark = document.body.classList.contains("dark-mode");
        Chart.defaults.color = isDark ? "#94A3B8" : "#5A6F84"; 
        Chart.defaults.borderColor = isDark ? "#334155" : "#D6E7F5"; 

        chartS = new Chart(document.getElementById('graficoSubjetivo').getContext('2d'), {
            type: 'bar', data: { labels: ['Ansiedade', 'Insônia', 'Fadiga', 'Irritabilidade'], datasets: [{ data: paciente.graficos.sub, backgroundColor: '#5C88BF', borderRadius: 4 }] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
        chartO = new Chart(document.getElementById('graficoObjetivo').getContext('2d'), {
            type: 'line', data: { labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], datasets: [{ data: paciente.graficos.obj, borderColor: '#5C88BF', backgroundColor: 'rgba(92, 136, 191, 0.2)', borderWidth: 2, fill: true, tension: 0.4 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
        chartA = new Chart(document.getElementById('graficoAvaliacao').getContext('2d'), {
            type: 'bar', data: { labels: ['F84.0', 'F90.0', 'F41.1'], datasets: [{ data: paciente.graficos.aval, backgroundColor: '#5C88BF', borderRadius: 4 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
        chartP = new Chart(document.getElementById('graficoPlano').getContext('2d'), {
            type: 'doughnut', data: { labels: ['Acompanhamento', 'Alta', 'Encaminhamento'], datasets: [{ data: paciente.graficos.plano, backgroundColor: ['#5C88BF', '#86A8D0', '#B0C7E1'], borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
    }

    // ==========================================
    // 5. LISTA LATERAL E BUSCA
    // ==========================================
    const listaPacientesUl = document.getElementById("lista-pacientes-ul");
    const inputBusca = document.getElementById("busca-paciente");

    function renderizarPacientes(filtro = "") {
        listaPacientesUl.innerHTML = ""; 
        const filtrados = pacientes.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()));

        filtrados.forEach((paciente, index) => {
            const li = document.createElement("li");
            li.className = `cartao-paciente ${index === 0 && filtro === "" ? "ativo" : ""}`;
            li.innerHTML = `
                <img src="${paciente.foto}" alt="Foto" class="foto-paciente">
                <div class="dados-paciente">
                    <h3>${paciente.nome}</h3>
                    <p>${paciente.diag}</p>
                    <div class="linha-progresso">
                        <div class="barra-fundo"><div class="barra-preenchimento" style="width: ${paciente.prog}%;"></div></div>
                        <span>${paciente.prog}%</span>
                    </div>
                </div>
                <div class="status-bolinha ${paciente.cor}"></div>
            `;
            
            li.addEventListener("click", () => {
                document.querySelectorAll(".cartao-paciente").forEach(c => c.classList.remove("ativo"));
                li.classList.add("ativo");
                atualizarPainelPrincipal(paciente);
                sidebar.classList.remove("aberta");
            });
            listaPacientesUl.appendChild(li);

            if (index === 0 && filtro === "") atualizarPainelPrincipal(paciente);
        });
    }

    renderizarPacientes(); 
    inputBusca.addEventListener("input", (e) => renderizarPacientes(e.target.value));

    // ==========================================
    // 6. ADICIONAR NOVOS DADOS AO PACIENTE ATUAL
    // ==========================================
    document.getElementById("btn-nova-obs").addEventListener("click", () => {
        const inputNovaObs = document.getElementById("input-nova-obs");
        const texto = inputNovaObs.value.trim();
        if(texto !== "" && pacienteAtual) {
            pacienteAtual.observacoes.unshift({ data: "Agora", texto: texto });
            atualizarPainelPrincipal(pacienteAtual); 
            inputNovaObs.value = ""; 
        }
    });

    document.getElementById("btn-novo-relatorio").addEventListener("click", () => {
        if(pacienteAtual) {
            const texto = prompt(`Digite o novo relatório clínico para ${pacienteAtual.nome}:`);
            if(texto) {
                pacienteAtual.relatorios.unshift({ tipo: "Sessão", data: "Hoje", texto: texto });
                atualizarPainelPrincipal(pacienteAtual); 
            }
        }
    });

});