let toDoListWrapper = document.createElement('div');
toDoListWrapper.classList.add('to-do-list__wrapper');
document.body.append(toDoListWrapper);

let addTaskContainer = document.createElement('div');
addTaskContainer.classList.add('to-do-list__add-task-container');

let inputNewTask = document.createElement('input');
inputNewTask.classList.add('to-do-list__input-new-task');
inputNewTask.setAttribute('name', 'newTask');
inputNewTask.setAttribute('type', 'text');
inputNewTask.setAttribute('placeholder', 'Enter new Task...');
inputNewTask.setAttribute('required', '');

let createTaskButton = document.createElement('div');
createTaskButton.classList.add('to-do-list__create-task-button');
createTaskButton.setAttribute('id', 'create-task');
createTaskButton.innerText = 'Add task';

addTaskContainer.append(inputNewTask, createTaskButton);

let hr = document.createElement('hr');

let tasksList = document.createElement('ul');
tasksList.classList.add('to-do-list__tasks-list');

toDoListWrapper.append(addTaskContainer, hr, tasksList);

