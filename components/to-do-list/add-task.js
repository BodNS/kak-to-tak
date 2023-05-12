let isValid = false;
let tasksList = document.querySelector('.to-do-list__tasks-list');
let addTaskButton = document.getElementById('create-task');
let inputText = document.querySelector('.to-do-list__input-new-task');
let deleteTaskButon = document.getElementById('deleteButton');

addTaskButton.addEventListener('click', addTask);
tasksList.addEventListener('click', delTask);
inputText.oninput = checkInput;

function checkInput () {
    inputText.classList.remove('to-do-list__invalidInput');
}


function testInput () {
    if (inputText.value.length > 0 && inputText.value.length <= 500) 
        isValid = true;
            else {
                inputText.classList.add('to-do-list__invalid-input');
                
                if (inputText.value.length == 0) alert ('Can\'t add empty task!');
                if (inputText.value.length > 1000) alert ('Maximal size of task"s text is 500 symbol.');
            }
}


function addTask () {
    testInput();
    if (isValid) {
        let newTask = document.createElement('li');
        newTask.classList.add ('to-do-list__task');

        let taskContent = document.createElement('p');
        newTask.textContent = inputText.value;
        
        let del = document.createElement('div');
        del.textContent = 'x';
        del.setAttribute('id', 'deleteButton');
        del.classList.add('to-do-list__delete-button');
        
        inputText.value = '';
        isValid = false;

        newTask.append(taskContent);
        newTask.append(del);
        return tasksList.append(newTask);
    }
    
}

function delTask (event) {
    if (event.target.id == 'deleteButton') 
       event.target.parentNode.remove();
}