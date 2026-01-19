// habits.js
function initHabits() { 
    console.log("habits module loaded"); 
    const habitInput = document.getElementById("habitInput"); 
    const addHabitBtn = document.getElementById("addHabitBtn"); 
    const habitList = document.getElementById("habitList");
    if (!habitInput || !addHabitBtn || !habitList) {
        console.warn("habits UI not found"); 
        return; 
}
addHabitBtn.addEventListener("click", () => {
    const text = habitInput.value.trim(); 
    if (!text) return;
    const li = document.createElement("li"); 
    li.textContent = text;
    habitList.appendChild(li); 
    habitInput.value = ""; 
});
} 
window.initHabits = initHabits; 
