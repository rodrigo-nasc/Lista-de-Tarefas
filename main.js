const input = document.getElementById("input");
const botaoAdiciona = document.getElementById("adicionar");
const tarefas = document.getElementById("tarefas");
const appLista = document.querySelector(".lista__tarefas");

let root = document.querySelector(":root");

let contador = 0;

function adicionar() {
    let valorInput = input.value;

    if (valorInput) {
        contador++;
        let novoItem = `<div id='${contador}' class="item" onclick='marcar(${contador})'>
    <div class="item__icone">
      <i id='icone_${contador}' class="mdi mdi-circle-outline"></i>
    </div>

    <div class="item__texto" id='tarefa_${valorInput}'>${valorInput}</div>

    <div class="item__delete">
      <button class="botao__deletar mdi mdi-delete" onclick='deletar(${contador})'><span class='texto__deletar'>Deletar</span></button>
    </div>
  </div>
`;

        tarefas.innerHTML += novoItem;

        input.value = "";
        input.focus();
    } else {
        alert("Insira uma tarefa");
    }
}

input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
        adicionar();
    }
});

function deletar(id) {
    let confirmacao = confirm(`Deseja excluir a tarefa tarefa?`);
    if (confirmacao) {
        let remove = document.getElementById(id);
        remove.remove();
        alert("Tarefa excluída");
    } else {
        let item = document.getElementById(id);
        let classe = item.getAttribute("classe");
        if (classe === "clicado") {
            item.classList.remove("clicado");
        } else {
            item.classList.add("clicado");
            alert("Tarefa mantida");
        }
    }
}

function marcar(id) {
    let item = document.getElementById(id);
    let classe = item.getAttribute("class");

    if (classe === "item") {
        item.classList.add("clicado");

        let icone = document.getElementById(`icone_${id}`);
        icone.classList.remove("mdi-circle-outline");
        icone.classList.add("mdi-check-circle");
    } else {
        item.classList.remove("clicado");

        let icone = document.getElementById(`icone_${id}`);
        icone.classList.add("mdi-circle-outline");
        icone.classList.remove("mdi-check-circle");
    }

    item.parentNode.appendChild(item);
}

function themes() {
    if (appLista.dataset.theme === "dark") {
        root.style.setProperty("--body-color", "#DCDCDC");
        root.style.setProperty("--font-color", "#000000");
        root.style.setProperty("--border-color", "	#000000");

        appLista.dataset.theme = "light";
    } else {
        root.style.setProperty("--body-color", "#000000");
        root.style.setProperty("--font-color", "#dcdcdc");
        root.style.setProperty("--border-color", "#a9a9a9");
        appLista.dataset.theme = "dark";
    }
}
