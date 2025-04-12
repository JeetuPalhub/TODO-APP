function addTask(columnId) {
    const input = document.getElementById(`${columnId}-input`);
    const taskText = input.value.trim();
    
    if(taskText == "") {
        return;
    }

    const taskElement = createTaskElement(taskText);

    document.getElementById(`${columnId}-task`).appendChild(taskElement);

    input.value = "";
}

function createTaskElement(taskElement) {
    const element = document.createElement("div");
    element.textContent = taskText;
    element.classList.add("card");
    // element.setAttribute("draggable", true);
    element.draggable = true;
    return element;
}
