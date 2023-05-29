import { ToDoList } from "./class-to-do-list.js";

if (!localStorage.getItem("taskId")) localStorage.setItem("taskId", 1);
if (!localStorage.getItem("tasksData")) localStorage.setItem("tasksData", JSON.stringify([]));

const toDoListWrapper = document.createElement('div');
toDoListWrapper.classList.add('to-do-list__wrapper');
document.body.append(toDoListWrapper);

const addTaskContainer = document.createElement('div');
addTaskContainer.classList.add('to-do-list__add-task-container');

const inputNewTask = document.createElement('input');
inputNewTask.classList.add('to-do-list__input-new-task');
inputNewTask.setAttribute('name', 'newTask');
inputNewTask.setAttribute('type', 'text');
inputNewTask.setAttribute('placeholder', 'Enter new Task...');
inputNewTask.setAttribute('required', '');

const createTaskButton = document.createElement('div');
createTaskButton.classList.add('to-do-list__create-task-button');
createTaskButton.setAttribute('id', 'create-task');
createTaskButton.innerText = 'Add task';

addTaskContainer.append(inputNewTask, createTaskButton);

const hr = document.createElement('hr');

const tasksListContainer = document.createElement('ul');
tasksListContainer.classList.add('to-do-list__tasks-list');

toDoListWrapper.append(addTaskContainer, hr, tasksListContainer);

const tasksList = new ToDoList(tasksListContainer);
tasksList.addListeners();

