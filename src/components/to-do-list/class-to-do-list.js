import { Task, textTaskError, dateTaskError } from "./class-task.js";

export class ToDoList {
  constructor(tasksListContainer) {
    this.tasksListContainer = tasksListContainer;
    this.inputText = document.querySelector(".to-do-list__input-new-task");
    this.tasksArray = [];
  }

  addListeners () {
    const addTaskButton = document.getElementById("create-task");
    addTaskButton.addEventListener("click", () => this.addTask()); //this.addTask.bind(this)
    this.tasksListContainer.addEventListener("click", this.delTask);
    this.inputText.addEventListener("keydown", (event) => {
      if (event.code == "Enter" || event.code == "NumpadEnter") this.addTask();
    });
    this.inputText.oninput = () => {
      this.inputText.classList.remove("to-do-list__invalid-input");
    };
    this.inputText.onfocus = () => {
      this.inputText.classList.remove("to-do-list__invalid-input");
    };
    this.showTasks();
  }
    
  showTasks() {
    this.tasksArray = JSON.parse(localStorage.getItem("tasksData"));
    this.tasksArray.forEach(e => this.renderTask(e._taskId, e._taskDate, e._taskText));
    this.tasksArray.length = 0;
  }

  renderTask(taskId, taskDate, taskText) {
    const newTask = document.createElement("li");
    newTask.classList.add("to-do-list__task");
    newTask.setAttribute("task-id", taskId);

    const taskValue = `${taskDate} - ${taskText}`;

    const taskContent = document.createElement("p");
    taskContent.textContent = taskValue;

    const del = document.createElement("div");
    del.textContent = "x";
    del.setAttribute("id", "deleteButton");
    del.classList.add("to-do-list__delete-button");

    newTask.append(taskContent);
    newTask.append(del);
    return this.tasksListContainer.append(newTask);
  }

  addTask() {
    try {
      const newTask = new Task(this.inputText.value);

      this.tasksArray = JSON.parse(localStorage.getItem("tasksData"));
      this.tasksArray.push(newTask);
      this.tasksArray.sort((a,b) => {
        let tmpDateA = new Date(a._taskDate.split(".").reverse().join("-"));
        let tmpDateB = new Date(b._taskDate.split(".").reverse().join("-"));
        return tmpDateA > tmpDateB ? 1 : -1;
      });
      let json = JSON.stringify(this.tasksArray);
      localStorage.setItem("tasksData", json);

      this.tasksArray.length = 0;
      json = "";
      this.inputText.value = "";
      this.inputText.classList.remove("to-do-list__invalid-input");

      this.tasksListContainer.replaceChildren();
      this.showTasks();
    } catch (error) {
      if (error instanceof textTaskError) {
        this.inputText.classList.add("to-do-list__invalid-input");
        alert(error.message);
      } else if (error instanceof dateTaskError) {
        alert(error.message);
      } else {
        throw error;
      }
    }
   
  }

  delTask(event) {
    if (event.target.id == "deleteButton") {
      let deletedTaskId = event.target.parentElement.getAttribute("task-id");
      this.tasksArray = JSON.parse(localStorage.getItem("tasksData"));
      
      let delIndex = this.tasksArray.findIndex(e => e._taskId == deletedTaskId);
      if (delIndex !== -1) this.tasksArray.splice( delIndex,1);
      event.target.parentElement.remove();
      console.log(delIndex);
      
      let json = JSON.stringify(this.tasksArray);
      localStorage.setItem("tasksData", json);
      json = "";
      this.tasksArray.length = 0;
    }
  }

}
