let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarNoLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = tarefa.texto;

        if (tarefa.concluida) {
            span.classList.add("concluida");
        }

        span.onclick = () => alternarConcluir(index);

        const btn = document.createElement("button");
        btn.innerText = "X";
        btn.classList.add("btn-excluir");

        btn.onclick = (e) => {
            e.stopPropagation();
            excluirTarefa(index);
        };

        li.appendChild(span);
        li.appendChild(btn);
        lista.appendChild(li);
    });
}

function adicionarTarefa() {
    const input = document.getElementById("inputTarefa");

    if (input.value.trim() === "") return;

    tarefas.push({
        texto: input.value,
        concluida: false
    });

    input.value = "";

    salvarNoLocalStorage();
    renderizarTarefas();
}

function alternarConcluir(index) {
    tarefas[index].concluida = !tarefas[index].concluida;

    salvarNoLocalStorage();
    renderizarTarefas();
}

function excluirTarefa(index) {
    tarefas.splice(index, 1);

    salvarNoLocalStorage();
    renderizarTarefas();
}

renderizarTarefas();
