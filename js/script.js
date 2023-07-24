   // Função para obter os dados das tarefas armazenados no localStorage
function getStoredTasks(column) {
    return JSON.parse(localStorage.getItem(column)) || [];
}

    // Função para atualizar os dados das tarefas no localStorage
function updateStoredTasks(column, tasks) {
    localStorage.setItem(column, JSON.stringify(tasks));
}

    // Array que armazena as tarefas em cada coluna
let todoTasks = getStoredTasks('todo');
let inProgressTasks = getStoredTasks('inProgress');
let doneTasks = getStoredTasks('done');

    // Função para atualizar o conteúdo das colunas
function updateColumns() {
    const todoColumn = document.getElementById('todo');
    const inProgressColumn = document.getElementById('inProgress');
    const doneColumn = document.getElementById('done');

    todoColumn.innerHTML = '';
    inProgressColumn.innerHTML = '';
    doneColumn.innerHTML = '';

        // Preencher a coluna "A fazer"
    for (const task of todoTasks) {
        const taskElement = createTaskElement(task, 'todo');
        todoColumn.appendChild(taskElement);
    }

        // Preencher a coluna "Em progresso"
    for (const task of inProgressTasks) {
        const taskElement = createTaskElement(task, 'inProgress');
        inProgressColumn.appendChild(taskElement);
    }

        // Preencher a coluna "Concluído"
    for (const task of doneTasks) {
        const taskElement = createTaskElement(task, 'done');
        doneColumn.appendChild(taskElement);
    }
}

    // Função para criar elementos de tarefa
function createTaskElement(task, column) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('card', 'mb-2');
    taskElement.innerHTML = `
    <div class="card-body">
    <p class="card-text">${task}</p>
    <button class="btn btn-sm btn-danger" onclick="removeTask('${task}', '${column}')">Remover</button>
    ${column !== 'done' ? `<button class="btn btn-sm btn-success" onclick="moveTask('${task}', '${column}')">Mover para ${getNextColumn(column)}</button>` : ''}
    </div>
    `;
    return taskElement;
}

    // Função para adicionar uma tarefa
function addTask(column) {
    let inputElement;
    switch (column) {
    case 'todo':
        inputElement = document.getElementById('inputTodo');
        break;
    case 'inProgress':
        inputElement = document.getElementById('inputInProgress');
        break;
    case 'done':
        inputElement = document.getElementById('inputDone');
        break;
    }

    const task = inputElement.value.trim();
    if (task) {
        switch (column) {
        case 'todo':
            todoTasks.push(task);
            break;
        case 'inProgress':
            inProgressTasks.push(task);
            break;
        case 'done':
            doneTasks.push(task);
            break;
        }

        updateStoredTasks('todo', todoTasks);
        updateStoredTasks('inProgress', inProgressTasks);
        updateStoredTasks('done', doneTasks);

        inputElement.value = '';
        updateColumns();
    }
}

    // Função para mover uma tarefa para a próxima coluna
function moveTask(task, currentColumn) {
    switch (currentColumn) {
    case 'todo':
        moveTaskHelper(task, todoTasks, inProgressTasks);
        break;
    case 'inProgress':
        moveTaskHelper(task, inProgressTasks, doneTasks);
        break;
    }
}

function moveTaskHelper(task, sourceArray, targetArray) {
    const index = sourceArray.indexOf(task);
    if (index !== -1) {
        sourceArray.splice(index, 1);
        targetArray.push(task);
        updateStoredTasks('todo', todoTasks);
        updateStoredTasks('inProgress', inProgressTasks);
        updateStoredTasks('done', doneTasks);
        updateColumns();
    }
}

    // Função para obter o nome da próxima coluna
function getNextColumn(column) {
    switch (column) {
    case 'todo':
        return 'Em progresso';
    case 'inProgress':
        return 'Concluído';
    default:
        return '';
    }
}

    // Função para remover uma tarefa
function removeTask(task, column) {
    const removeFromArray = array => {
        const index = array.indexOf(task);
        if (index !== -1) {
            array.splice(index, 1);
        }
    };

    removeFromArray(todoTasks);
    removeFromArray(inProgressTasks);
    removeFromArray(doneTasks);

    updateStoredTasks('todo', todoTasks);
    updateStoredTasks('inProgress', inProgressTasks);
    updateStoredTasks('done', doneTasks);

    updateColumns();
}

    // Atualizar as colunas inicialmente
updateColumns();