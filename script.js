// ===== TROCA DE TEMA =====
const temas = {
    azul: { principal: '#5C88BF', secundaria: '#7BA5D1', grad1: '#E8F1F8', grad2: '#F2F7FB', grad3: '#E4F3EE' },
    verde: { principal: '#5B8C5A', secundaria: '#7FAE7D', grad1: '#EAF5E8', grad2: '#F2F8F2', grad3: '#E0F3EC' },
    roxo: { principal: '#7B68AE', secundaria: '#9C8CC4', grad1: '#F0EDF8', grad2: '#F6F4FB', grad3: '#EDE8F7' },
    marrom: { principal: '#8D7B68', secundaria: '#AC9D8B', grad1: '#F5F0EB', grad2: '#FBF9F6', grad3: '#F0EAE0' },
    preto: { principal: '#111', secundaria: '#444', grad1: '#F0F0F0', grad2: '#FFF', grad3: '#E8E8E8' }
};

function trocarTema(nomeTema) {
    const t = temas[nomeTema];
    const raiz = document.documentElement.style;

    raiz.setProperty('--cor-principal', t.principal);
    raiz.setProperty('--cor-secundaria', t.secundaria);
    raiz.setProperty('--grad-1', t.grad1);
    raiz.setProperty('--grad-2', t.grad2);
    raiz.setProperty('--grad-3', t.grad3);

    document.querySelectorAll('.tema-cor').forEach(el => el.classList.remove('selecionado'));
    document.getElementById('tema-' + nomeTema).classList.add('selecionado');

    document.querySelectorAll('.cores').forEach(el => el.classList.remove('selecionado'));
    document.getElementById(nomeTema).classList.add('selecionado');

    localStorage.setItem('tema-escolhido', nomeTema);
}

document.getElementById('tema-azul').addEventListener('click', () => trocarTema('azul'));
document.getElementById('tema-verde').addEventListener('click', () => trocarTema('verde'));
document.getElementById('tema-roxo').addEventListener('click', () => trocarTema('roxo'));
document.getElementById('tema-marrom').addEventListener('click', () => trocarTema('marrom'));
document.getElementById('tema-preto').addEventListener('click', () => trocarTema('preto'));

document.getElementById('azul').addEventListener('click', () => trocarTema('azul'));
document.getElementById('verde').addEventListener('click', () => trocarTema('verde'));
document.getElementById('roxo').addEventListener('click', () => trocarTema('roxo'));
document.getElementById('marrom').addEventListener('click', () => trocarTema('marrom'));
document.getElementById('preto').addEventListener('click', () => trocarTema('preto'));


// ===== MODAL DE CADASTRO =====
const modalOverlay = document.getElementById('modal-overlay');
const textoDoPasso = document.getElementById('texto-do-passo');
const barraDoPasso = document.getElementById('barra-do-passo');
const conteudo1 = document.querySelector('.modal-conteudo-1');
const conteudo2 = document.querySelector('.modal-conteudo-2');

function abrirModal() {
    modalOverlay.style.display = 'flex';
}

document.getElementById('btn-comecar').addEventListener('click', abrirModal);
document.getElementById('login').addEventListener('click', abrirModal);

document.getElementById('modal-fechar').addEventListener('click', function () {
    modalOverlay.style.display = 'none';
});

let perfilSelecionado = null;

document.querySelectorAll('.perfil-opcao').forEach(botao => {
    botao.addEventListener('click', function () {
        document.querySelectorAll('.perfil-opcao').forEach(b => b.classList.remove('selecionado'));
        this.classList.add('selecionado');
        perfilSelecionado = this.dataset.perfil;
    });
});

document.getElementById('modal-continuar').addEventListener('click', function () {
    if (!perfilSelecionado) {
        alert('Por favor, selecione se você é pessoa com TEA ou familiar/responsável.');
        return;
    }

    conteudo1.style.display = 'none';
    conteudo2.style.display = 'block';
    textoDoPasso.textContent = 'Passo 2 de 2';
    barraDoPasso.style.width = '100%';
    document.getElementById('input-email-2').value = document.getElementById('input-email').value;
});

document.getElementById('modal-continuar-2').addEventListener('click', function () {
    const senha = document.getElementById('input-senha').value;
    const confirmarSenha = document.getElementById('input-confirmar-senha').value;

    if (!senha) {
        alert('Por favor, crie uma senha.');
        return;
    }

    const regexSenha = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!regexSenha.test(senha)) {
        alert('A senha precisa ter no mínimo 8 caracteres, 1 letra maiúscula e 1 caractere especial.');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    const nome = document.getElementById('input-nome').value;

    localStorage.setItem('usuario-nome', nome);
    localStorage.setItem('usuario-logado', 'true');

    mostrarUsuarioLogado(nome);

    modalOverlay.style.display = 'none';
});

function mostrarUsuarioLogado(nome) {
    document.getElementById('area-login').style.display = 'none';
    document.getElementById('area-usuario').style.display = 'flex';
    document.getElementById('saudacao-usuario').textContent = 'Olá, ' + nome + '!';
}

document.getElementById('btn-sair').addEventListener('click', function () {
    localStorage.removeItem('usuario-logado');
    localStorage.removeItem('usuario-nome');

    document.getElementById('area-usuario').style.display = 'none';
    document.getElementById('area-login').style.display = 'block';
});


// ===== ABAS "COMO FUNCIONA" =====
document.getElementById('aba-tea').addEventListener('click', function () {
    document.querySelector('.conteudo-aba-profissional').style.display = 'none';
    document.querySelector('.conteudo-aba-tea').style.display = 'flex';

    document.getElementById('aba-tea').classList.add('aba-ativa');
    document.getElementById('aba-profissional').classList.remove('aba-ativa');
});

document.getElementById('aba-profissional').addEventListener('click', function () {
    document.querySelector('.conteudo-aba-tea').style.display = 'none';
    document.querySelector('.conteudo-aba-profissional').style.display = 'flex';

    document.getElementById('aba-profissional').classList.add('aba-ativa');
    document.getElementById('aba-tea').classList.remove('aba-ativa');
});


// ===== TEMA SALVO AO CARREGAR =====
const temaSalvo = localStorage.getItem('tema-escolhido');
if (temaSalvo) {
    trocarTema(temaSalvo);
}

// ===== USUÁRIO LOGADO AO CARREGAR =====
const usuarioLogado = localStorage.getItem('usuario-logado');
if (usuarioLogado === 'true') {
    const nomeSalvo = localStorage.getItem('usuario-nome');
    mostrarUsuarioLogado(nomeSalvo);
}

// ===== ANIMAÇÃO GLOBAL DE CLIQUE =====
document.querySelectorAll('button, a').forEach(elemento => {
    elemento.addEventListener('click', function () {
        this.classList.add('animar-clique');
        setTimeout(() => {
            this.classList.remove('animar-clique');
        }, 250);
    });
});

// ===== LINK ATIVO NO MENU =====
document.querySelectorAll('.head').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.head').forEach(l => l.classList.remove('head-ativo'));
        this.classList.add('head-ativo');
    });
});

// ===== CPF: bloquear letras + máscara =====
document.getElementById('input-cpf').addEventListener('keypress', function (e) {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

document.getElementById('input-cpf').addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.slice(0, 11);

    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    e.target.value = valor;
});

// ===== BOTÃO "VER COMO FUNCIONA" =====
document.getElementById('btn-ver-como-funciona').addEventListener('click', function () {
    document.getElementById('como-funciona').scrollIntoView({ behavior: 'smooth' });
});


// ===== SISTEMA DE ROTINA (card com dias da semana + card do hero) =====

const DIAS_SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
const NOMES_DIAS = { dom: 'Domingo', seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta', sex: 'Sexta', sab: 'Sábado' };
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function formatarData(data) {
    return data.getFullYear() + '-' + String(data.getMonth() + 1).padStart(2, '0') + '-' + String(data.getDate()).padStart(2, '0');
}

let tarefasFixas = JSON.parse(localStorage.getItem('rotina-tarefas-fixas') || '[]');
let tarefasUnicas = JSON.parse(localStorage.getItem('rotina-tarefas-unicas') || '{}');
let concluidasPorDia = JSON.parse(localStorage.getItem('rotina-concluidas') || '{}');
let dataSelecionada = localStorage.getItem('rotina-data-atual')
    ? new Date(localStorage.getItem('rotina-data-atual') + 'T00:00:00')
    : new Date();

function salvarTudo() {
    localStorage.setItem('rotina-tarefas-fixas', JSON.stringify(tarefasFixas));
    localStorage.setItem('rotina-tarefas-unicas', JSON.stringify(tarefasUnicas));
    localStorage.setItem('rotina-concluidas', JSON.stringify(concluidasPorDia));
    localStorage.setItem('rotina-data-atual', formatarData(dataSelecionada));
}

function renderizarAbasSemana() {
    const container = document.getElementById('dias-semana-tabs');
    container.innerHTML = '';

    const hoje = new Date();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());

    for (let i = 0; i < 7; i++) {
        const data = new Date(inicioSemana);
        data.setDate(inicioSemana.getDate() + i);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add('dia-tab');
        if (formatarData(data) === formatarData(dataSelecionada)) {
            btn.classList.add('dia-tab-ativo');
        }
        btn.innerHTML = `<span class="dia-tab-nome">${NOMES_DIAS[DIAS_SEMANA[i]].slice(0, 3)}</span><span class="dia-tab-numero">${data.getDate()}</span>`;

        btn.addEventListener('click', function () {
            dataSelecionada = data;
            salvarTudo();
            renderizarTudo();
        });

        container.appendChild(btn);
    }
}

function tarefasDoDia() {
    const diaSemana = DIAS_SEMANA[dataSelecionada.getDay()];
    const dataStr = formatarData(dataSelecionada);

    const fixasDoDia = tarefasFixas.filter(t => t.dias.includes(diaSemana));
    const unicasDoDia = tarefasUnicas[dataStr] || [];

    return [...fixasDoDia, ...unicasDoDia].sort((a, b) => a.horario.localeCompare(b.horario));
}

function excluirTarefa(id) {
    const indexFixa = tarefasFixas.findIndex(t => t.id === id);

    if (indexFixa !== -1) {
        tarefasFixas.splice(indexFixa, 1);
    } else {
        const dataStr = formatarData(dataSelecionada);
        if (tarefasUnicas[dataStr]) {
            tarefasUnicas[dataStr] = tarefasUnicas[dataStr].filter(t => t.id !== id);
        }
    }

    Object.keys(concluidasPorDia).forEach(dia => {
        concluidasPorDia[dia] = concluidasPorDia[dia].filter(x => x !== id);
    });

    salvarTudo();
    renderizarTudo();
}

function renderizarLista() {
    const lista = document.getElementById('lista-rotina');
    lista.innerHTML = '';

    const dataStr = formatarData(dataSelecionada);
    const concluidasHoje = concluidasPorDia[dataStr] || [];
    const tarefas = tarefasDoDia();

    tarefas.forEach(tarefa => {
        const concluida = concluidasHoje.includes(tarefa.id);
        const li = document.createElement('li');
        li.classList.add('rotina-tarefa');
        if (concluida) li.classList.add('concluida');
        li.dataset.id = tarefa.id;
        li.innerHTML = `
            <input type="checkbox" ${concluida ? 'checked' : ''}>
            <span class="tarefa-horario">${tarefa.horario}</span>
            <span class="tarefa-nome">${tarefa.nome}</span>
            <span class="tarefa-duracao">${tarefa.duracao}min</span>
            <button type="button" class="btn-excluir-tarefa" title="Excluir tarefa">×</button>
        `;
        lista.appendChild(li);
    });

    document.getElementById('rotina-total').textContent = tarefas.length;
    document.getElementById('rotina-concluidas').textContent = concluidasHoje.length;
    document.getElementById('rotina-barra-preenchida').style.width = tarefas.length
        ? (concluidasHoje.length / tarefas.length * 100) + '%'
        : '0%';
}

function renderizarCabecalho() {
    const diaSemana = DIAS_SEMANA[dataSelecionada.getDay()];
    document.getElementById('rotina-data-texto').textContent =
        NOMES_DIAS[diaSemana].toUpperCase() + ', ' + dataSelecionada.getDate() + ' ' + MESES[dataSelecionada.getMonth()];
}

function renderizarCardHero() {
    const diaSemana = DIAS_SEMANA[dataSelecionada.getDay()];
    const dataStr = formatarData(dataSelecionada);
    const concluidasHoje = concluidasPorDia[dataStr] || [];

    const fixasDoDia = tarefasFixas
        .filter(t => t.dias.includes(diaSemana))
        .sort((a, b) => a.horario.localeCompare(b.horario));

    document.getElementById('hero-rotina-data').textContent =
        NOMES_DIAS[diaSemana] + ', ' + dataSelecionada.getDate() + ' ' + MESES[dataSelecionada.getMonth()];

    const lista = document.getElementById('hero-lista-tarefas');
    lista.innerHTML = '';

    fixasDoDia.forEach(tarefa => {
        const concluida = concluidasHoje.includes(tarefa.id);
        const li = document.createElement('li');
        li.classList.add('tarefa');
        if (concluida) li.classList.add('concluida');
        li.dataset.id = tarefa.id;
        li.innerHTML = `
            <input type="checkbox" ${concluida ? 'checked' : ''}>
            <span>${tarefa.nome}</span>
            <span class="horario">${tarefa.horario}</span>
        `;
        lista.appendChild(li);
    });

    const totalFixas = fixasDoDia.length;
    const concluidasFixas = fixasDoDia.filter(t => concluidasHoje.includes(t.id)).length;

    document.getElementById('hero-total').textContent = totalFixas;
    document.getElementById('hero-concluidas').textContent = concluidasFixas;
    document.getElementById('hero-barra-preenchida').style.width = totalFixas
        ? (concluidasFixas / totalFixas * 100) + '%'
        : '0%';
}

function renderizarTudo() {
    renderizarAbasSemana();
    renderizarCabecalho();
    renderizarLista();
    renderizarCardHero();
}

document.getElementById('lista-rotina').addEventListener('change', function (e) {
    if (e.target.type !== 'checkbox') return;
    const li = e.target.closest('.rotina-tarefa');
    const id = li.dataset.id;
    const dataStr = formatarData(dataSelecionada);
    if (!concluidasPorDia[dataStr]) concluidasPorDia[dataStr] = [];

    if (e.target.checked) {
        concluidasPorDia[dataStr].push(id);
    } else {
        concluidasPorDia[dataStr] = concluidasPorDia[dataStr].filter(x => x !== id);
    }
    salvarTudo();
    renderizarTudo();
});

document.getElementById('lista-rotina').addEventListener('click', function (e) {
    if (!e.target.classList.contains('btn-excluir-tarefa')) return;

    const li = e.target.closest('.rotina-tarefa');
    const id = li.dataset.id;

    const confirmar = confirm('Tem certeza que quer excluir essa tarefa?');
    if (confirmar) {
        excluirTarefa(id);
    }
});

document.getElementById('hero-lista-tarefas').addEventListener('change', function (e) {
    if (e.target.type !== 'checkbox') return;

    const li = e.target.closest('.tarefa');
    const id = li.dataset.id;
    const dataStr = formatarData(dataSelecionada);
    if (!concluidasPorDia[dataStr]) concluidasPorDia[dataStr] = [];

    if (e.target.checked) {
        concluidasPorDia[dataStr].push(id);
    } else {
        concluidasPorDia[dataStr] = concluidasPorDia[dataStr].filter(x => x !== id);
    }

    salvarTudo();
    renderizarTudo();
});

document.getElementById('abrir-form-rotina').addEventListener('click', function () {
    document.getElementById('form-rotina').style.display = 'flex';
    this.style.display = 'none';
});

let tipoTarefaSelecionado = 'unica';
let diasFixosSelecionados = [];

document.getElementById('tipo-unica').addEventListener('click', function () {
    tipoTarefaSelecionado = 'unica';
    this.classList.add('selecionado');
    document.getElementById('tipo-fixa').classList.remove('selecionado');
    document.getElementById('dias-fixos-opcoes').style.display = 'none';
});

document.getElementById('tipo-fixa').addEventListener('click', function () {
    tipoTarefaSelecionado = 'fixa';
    this.classList.add('selecionado');
    document.getElementById('tipo-unica').classList.remove('selecionado');
    document.getElementById('dias-fixos-opcoes').style.display = 'flex';
});

document.querySelectorAll('.dia-fixo-opcao').forEach(botao => {
    botao.addEventListener('click', function () {
        this.classList.toggle('selecionado');
        const dia = this.dataset.dia;
        diasFixosSelecionados = diasFixosSelecionados.includes(dia)
            ? diasFixosSelecionados.filter(d => d !== dia)
            : [...diasFixosSelecionados, dia];
    });
});

document.getElementById('salvar-tarefa-rotina').addEventListener('click', function () {
    const horario = document.getElementById('novo-horario-rotina').value;
    const nome = document.getElementById('novo-nome-rotina').value;
    const duracao = document.getElementById('nova-duracao-rotina').value;

    if (!horario || !nome || !duracao) {
        alert('Preencha todos os campos.');
        return;
    }
    if (tipoTarefaSelecionado === 'fixa' && diasFixosSelecionados.length === 0) {
        alert('Selecione pelo menos um dia da semana.');
        return;
    }

    const novaTarefa = { id: 'tarefa-' + Date.now(), horario, nome, duracao };

    if (tipoTarefaSelecionado === 'fixa') {
        novaTarefa.dias = [...diasFixosSelecionados];
        tarefasFixas.push(novaTarefa);
    } else {
        const dataStr = formatarData(dataSelecionada);
        if (!tarefasUnicas[dataStr]) tarefasUnicas[dataStr] = [];
        tarefasUnicas[dataStr].push(novaTarefa);
    }

    salvarTudo();
    renderizarTudo();

    document.getElementById('novo-horario-rotina').value = '';
    document.getElementById('novo-nome-rotina').value = '';
    document.getElementById('nova-duracao-rotina').value = '';
    diasFixosSelecionados = [];
    document.querySelectorAll('.dia-fixo-opcao').forEach(b => b.classList.remove('selecionado'));
    document.getElementById('form-rotina').style.display = 'none';
    document.getElementById('abrir-form-rotina').style.display = 'block';
});

document.getElementById('concluir-dia').addEventListener('click', function () {
    const tarefas = tarefasDoDia();
    const dataStr = formatarData(dataSelecionada);
    const concluidasHoje = concluidasPorDia[dataStr] || [];
    const pendentes = tarefas.length - concluidasHoje.length;

    if (pendentes > 0) {
        const confirmar = confirm('Você tem ' + pendentes + ' tarefa(s) não concluída(s) hoje. Elas serão perdidas ao avançar o dia. Deseja continuar?');
        if (!confirmar) return;
    }

    const proximaData = new Date(dataSelecionada);
    proximaData.setDate(proximaData.getDate() + 1);
    dataSelecionada = proximaData;

    salvarTudo();
    renderizarTudo();
});

renderizarTudo();


// ===== BOTÃO SALVAR NOTA =====
const botaoSalvarNota = document.querySelector('.anotacoes-salvar');
const inputTituloNota = document.querySelector('.anotacoes-titulo');
const textareaNota = document.querySelector('.anotacoes-texto');
const textoOriginalBotaoNota = botaoSalvarNota.textContent;

botaoSalvarNota.addEventListener('click', function () {
    if (!inputTituloNota.value.trim() && !textareaNota.value.trim()) {
        alert('Escreva alguma coisa antes de salvar.');
        return;
    }

    botaoSalvarNota.textContent = '✓ Nota salva!';
    botaoSalvarNota.disabled = true;

    setTimeout(function () {
        inputTituloNota.value = '';
        textareaNota.value = '';
        botaoSalvarNota.textContent = textoOriginalBotaoNota;
        botaoSalvarNota.disabled = false;
    }, 1200);
});