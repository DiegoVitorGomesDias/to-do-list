import * as mySQL from './connectionBackEnd/index.js';

const $btn_adc = document.getElementById("adc-tarefa");
const $add_txt_tarefa = document.getElementById("input-tarefa");
const $tarefas = document.getElementById("tarefas");

const tasks = await mySQL.getAllTasks() || JSON.parse(localStorage.getItem("tasks")) || [];
let $tarefas_title = [];

const updateTask = async (task) =>
{
    task.innerText = task.innerText.trim().length < 90 ? task.innerText.trim() : task.innerText.trim().substring(0, 90);

    const id = task.parentNode.id.trim();
    const title = task.innerText;
    const status = task.parentNode.children[0].checked ? "closed" : "open";

    tasks[id] = { title, status };
    if (title != false) mySQL.updateTask(id, title, status);
}

const mapTasksChange = () =>
{
    $tarefas_title = [];
    $tarefas_title = document.querySelectorAll(".tarefa-text[contenteditable='true']");

    $tarefas_title.forEach( e => e.removeEventListener("blur", updateTask, false));
    $tarefas_title.forEach( e => e.addEventListener("blur", ({target}) => updateTask(target)));

    $tarefas_title.forEach( e => e.addEventListener("keydown", ({key}) => 
    { if ( key === "Escape" || key === "Enter" ) $tarefas_title.forEach( e => e.blur()) }));
}

const mapTasks = async () =>
{    
    $tarefas.innerHTML = "";

    tasks.sort( ({status: a}, {status: b}) =>  
    {
        if (a < b) return -1;
        if (a = b) return 0;
        if (a > b) return 1;
    }).map((e,i) =>
    {
        $tarefas.insertAdjacentHTML("afterbegin", 
        `
            <div 
                class="tarefas-list ${ e.status === "closed" ? "tarefa-concluida" : "" }" 
                id="`+(e.id || i) +`" 
            >

                <input type="checkbox" 
                    class="tarefa-concluida" 
                    title="checkbox-task-completed" 
                    ${ e.status === "closed" ? "checked" : "" }
                >

                <label class="tarefa-text" 
                    ${ e.status === "closed" ? "contenteditable='false'" : "contenteditable='true'"}
                >
                    `+e.title+`
                </label>

                <input type="button" value="Excluir" class="excluir-tarefa">
            </div>
        `);
    });
    mapTasksChange();
};

const adctarefa = () =>
{
    if ( $add_txt_tarefa.value.trim().length > 1 ) 
    {
        const txt = $add_txt_tarefa.value;
        $add_txt_tarefa.value = "";

        tasks.push({ title: txt, status: "open" })
        mySQL.addTask(txt).then( (values) => tasks.map( (e, i) => values[i] ) ).catch( (err) => {} );
        mapTasks();
    }
}

$btn_adc.addEventListener("click", () => adctarefa());

$add_txt_tarefa.addEventListener("keypress", (infos_event) =>
{
    infos_event.preventDefault();
    if (infos_event.key === "Enter") adctarefa();
    else if($add_txt_tarefa.value.length < 90) $add_txt_tarefa.value += infos_event.key;
});  

$tarefas.addEventListener("click", (infos_event) =>
{
    const $click = infos_event.target;
    const id = $click.parentNode.id.trim();

    const $label = $click.children[1] ? $click.children[1] : $click.parentNode.children[1];
    
    if ($click.children[1] ? $label.nodeName ===  "LABEL" : false) { $click.children[1].focus(); }
    else if ($click.children[1]) $click.children[1].blur();
    
    if ($click.value === "on")
    {
        if ($click.hasAttribute("checked"))
        {
            $click.removeAttribute("checked", "checked");
            $click.parentNode.classList.remove("tarefa-concluida");
            $click.parentNode.children[1].setAttribute("contenteditable", "true");

            $tarefas.insertAdjacentHTML("afterbegin", $click.parentNode.outerHTML);
            $click.parentNode.outerHTML = "";

            updateTask($label);
        }
        else if(!$click.hasAttribute("checked"))
        {
            $click.setAttribute("checked", "checked");
            $click.parentNode.classList.add("tarefa-concluida");
            $click.parentNode.children[1].setAttribute("contenteditable", "false");
            
            $tarefas.insertAdjacentHTML("beforeend", $click.parentNode.outerHTML);
            $click.parentNode.outerHTML = "";

            updateTask($label);
        }
        mapTasksChange()
    }
    else if ($click.value === "Excluir")
    {
        $click.parentNode.outerHTML = "";
        tasks.splice(id, 1).map( (e,i) => e.id = i )
        mySQL.deleteTask(id);
    }
})

window.addEventListener("loadstart", mapTasks());
window.addEventListener("beforeunload", () => localStorage.setItem("tasks", JSON.stringify(tasks)))
$add_txt_tarefa.focus();