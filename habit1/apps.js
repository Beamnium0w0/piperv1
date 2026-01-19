const todoForm = document.getElementById("todoForm"); 
const todoInput = document.getElementById("todoInput");
const piperLine = document.getElementById("piperLine");  
function animatePiper() {
    piperLine.classList.remove("piper-pop"); 
    void piperLine.offsetWidth; 
    piperLine.classList.add("piper-pop");
} 
const todoList = document.getElementById("todoList"); 
const stats = document.getElementById("stats"); 
const clearBtn = document.getElementById("clearBtn"); 
const STORAGE_KEY = "miniTrackerTodos"; 
const piperReactions = { 
    care: [ 
        "nice job taking care of yourself!",
        "you're doing great, keep it up!",
        "tiny steps count!"
    ],
    joy: [
        "thats a cozy win!",
        "yay! i'm so happy for you!",
        "celebrate the small victories!"
    ],
    focus: [
        "way to stay on track!",
        "you're crushing it!",
        "you started and thats the hardest part!"
    ],
    connection: [
        "that was so sweet of you pookie!",
        "im proud of you for reaching out!",
        "connections make life better!"
    ],
    default: [ 
        "great job!",
        "that Obviously counts!",
        "you're doing amazing!",
        "i'm proud of you!" 
        ]
};
function categorizeTask(taskText) {
    const t = taskText.toLowerCase(); 
    if (t.includes("water") || t.includes("drink")) return "care"; 
    if (t.includes("med") || t.includes("vitamin")) return "care"; 
    if (t.includes("sleep") || t.includes("nap") || t.includes("rest")) return "care"; 
    if (t.includes("walk") || t.includes("outside") || t.includes("fresh air")) return "care"; 
    if (t.includes("text") || t.includes("call") || t.includes("meet")) return "connection"; 
    if (t.includes("read") || t.includes("journal") || t.includes("meditate")) return "joy"; 
    if (t.includes("work") || t.includes("study") || t.includes("focus")) return "focus"; 
    if (t.includes("clean") || t.includes("organize") || t.includes("declutter")) return "joy"; 
    if (t.includes("hobby") || t.includes("fun") || t.includes("game")) return "joy"; 
    return "default";
}
function piperReactto(taskText) { 
const category = categorizeTask(taskText); 
const options = piperReactions[category] || piperReactions.default; 
const reaction = 
options[Math.floor(Math.random() * options.length)]; 
piperLine.textContent = reaction; 
animatePiper(); 
} 
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; 
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
} 
function updateStats() {
    const total = todos.length; 
    const done = todos.filter(todo => todo.done).length;
    stats.textContent = total === 0 
        ? "No tasks added yet. Add one!" 
        : `${done} of ${total} done`;
} 
function render () { 
    todoList.innerHTML = ""; 
    todos.forEach((todo) => {
        const li = document.createElement("li"); 
        li.className = "item" + (todo.done ? " done" : "");
        const left = document.createElement("div"); 
        left.className = "left";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"; 
        checkbox.checked = todo.done;
        checkbox.addEventListener("change", () => {
            todo.done = checkbox.checked;
           if (todo.done){ 
            piperReactto(todo.text);
           }
           saveTodos(); 
           render();
        });
        const text = document.createElement("span");
        text.className = "text"; 
        text.textContent = todo.text;
        left.appendChild(checkbox);
        left.appendChild(text);
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "small";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            render();
        });
        li.appendChild(left);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
    updateStats();
}
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text === "") return;
    const newTodo = {
        id: crypto.randomUUID(),
        text, 
        done: false,
        createdAt: Date.now(),
    };
    todos.unshift(newTodo); 
    todoInput.value = "";
    saveTodos();
    render();
}); 
clearBtn.addEventListener("click", () => { 
    todos = [];
    saveTodos();
    render();
});
render(); 
