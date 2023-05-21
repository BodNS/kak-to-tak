export class ToDoList {
  constructor(tasksListContainer) {
    this.tasksListContainer = tasksListContainer;
    this.inputText = document.querySelector(".to-do-list__input-new-task");
  }

  showTasks() {
    const tasksArray = [];
    const addTaskButton = document.getElementById("create-task");
    addTaskButton.addEventListener("click", () => this.addTask());  //this.addTask.bind(this)
    this.tasksListContainer.addEventListener("click", this.delTask);
    this.inputText.addEventListener("keydown", (event)=> {if (event.code == "Enter" || event.code == "NumpadEnter") this.addTask()});
    this.inputText.oninput = ()=> {this.inputText.classList.remove("to-do-list__invalid-input")};
    
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key === "taskId") continue;
      let value = localStorage.getItem(key);
      console.log(key, " : ", value);
      
      this.renderTask(key, value);
    }
  }

  renderTask(taskId, taskValue) {
    const tasksList = document.querySelector(".to-do-list__tasks-list");
    const newTask = document.createElement("li");
    newTask.classList.add("to-do-list__task");
    newTask.setAttribute("task-id", taskId);

    const taskContent = document.createElement("p");
    taskContent.textContent = taskValue;

    const del = document.createElement("div");
    del.textContent = "x";
    del.setAttribute("id", "deleteButton");
    del.classList.add("to-do-list__delete-button");

    newTask.append(taskContent);
    newTask.append(del);
    return tasksList.append(newTask);
  }

  addTask() {
    let isValid = this.testInput();
    if (isValid) {
      let taskId = localStorage.getItem("taskId");
      const taskDate = sessionStorage.getItem("calendarDate");
      const taskText = `${taskDate} - ${this.inputText.value}`;
      this.renderTask(taskId, taskText);

      localStorage.setItem(`${taskId}`, taskText);
      this.inputText.value = "";
      isValid = false;
      taskId++;
      localStorage.setItem("taskId", taskId);
      this.inputText.classList.remove("to-do-list__invalid-input");
    }
  }

  delTask(event) {
    if (event.target.id == "deleteButton") {
      let deletedTaskId = event.target.parentElement.getAttribute("task-id");
      localStorage.removeItem(deletedTaskId);
      event.target.parentElement.remove();
    }
  }

  testInput() {
    let nowDate = new Date ();
    nowDate.setHours(0, 0, 0, 0);
    let taskDate = sessionStorage.getItem("calendarDate");
    taskDate = new Date(taskDate.split(".").reverse().join("-"));
    
    if (this.inputText.value.length > 0 && this.inputText.value.length <= 500 && taskDate > nowDate)
      return true;
    else {
      this.inputText.classList.add("to-do-list__invalid-input");
      if (this.inputText.value.length == 0) alert("Can't add empty task!");
      if (this.inputText.value.length > 1000)
        alert('Maximal size of task"s text is 500 symbol.');
      if (taskDate < nowDate) alert ("Task's date can't be less than today's date");   
    return false;
    }
  }
}
