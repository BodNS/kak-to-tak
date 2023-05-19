import { renderTask } from "./show-tasks.js";

/* let isValid = false,
  taskId; */
//const tasksList = document.querySelector(".to-do-list__tasks-list");
//const addTaskButton = document.getElementById("create-task");
//const inputText = document.querySelector(".to-do-list__input-new-task");

//addTaskButton.addEventListener("click", addTask);
//inputText.addEventListener("keydown", (event)=> {if (event.code == "Enter" || event.code == "NumpadEnter") addTask()});
//tasksList.addEventListener("click", delTask);
//inputText.oninput = ()=> {inputText.classList.remove("to-do-list__invalid-input")};
    
function testInput() {
  if (inputText.value.length > 0 && inputText.value.length <= 500)
    isValid = true;
  else {
    inputText.classList.add("to-do-list__invalid-input");

    if (inputText.value.length == 0) alert("Can't add empty task!");
    if (inputText.value.length > 1000)
      alert('Maximal size of task"s text is 500 symbol.');
  }
}

function addTask() {
  testInput();
  if (isValid) {
    let taskId = localStorage.getItem("taskId");
    const taskDate = sessionStorage.getItem("calendarDate");
    const taskText = `${taskDate} - ${inputText.value}`;
    renderTask(taskId, taskText);
    
    localStorage.setItem(`${taskId}`, taskText);
    inputText.value = "";
    isValid = false;
    taskId++;
    localStorage.setItem('taskId', taskId);
  }
}

function delTask(event) {
  if (event.target.id == "deleteButton") {
    let deletedTaskId = event.target.parentElement.getAttribute('task-id');
    localStorage.removeItem(deletedTaskId);
    event.target.parentElement.remove();
  }
}

