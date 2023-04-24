const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', checkEditRemove)
filterOption.addEventListener('click', filterTodos)
document.addEventListener('DOMContentLoaded', getLocalTodos)

function addTodo(e) {
    e.preventDefault()
    // console.log(e);
    // get todo value :
    // create new todo
    // add to dom
    //reset input
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo');
    const newTodo = ` <li>${todoInput.value}</li>
            <span><i class="fa-regular fa-square-check"></i></span>
            <span><i class="fa-regular fa-pen-to-square"></i></span>
            <span><i class="fa-regular fa-trash-can"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value)
    todoInput.value = '';

}

function checkEditRemove(e) {
    const classList = [...e.target.classList];
    const item = e.target;
    // console.log(classList);
    if (classList[1] === 'fa-square-check') {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('completed');
    } else if (classList[1] === 'fa-pen-to-square') {

    } else if (classList[1] === 'fa-trash-can') {
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo)
        todo.remove();
    } else {

    }

}

function filterTodos(e) {
    console.log(e.target.value);
    // console.log(todoList.childNodes);
    const todos = [...todoList.childNodes];
    todos.forEach((todo) => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

        }
    })
}

function saveLocalTodos(todo) {
    // localStorage.getItem('todo')
    // localStorage.setItem(todo,JSON.stringify(todo));
    // ورودی اول اسمشه, دومی چیزی که میخوایم ذخیره بشه

    const todos = [...todoList.childNodes];
    let savedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    // parse--> خارج میکنه string از حالت
    savedTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(savedTodos))
}

function getLocalTodos() {

    const todos = [...todoList.childNodes];
    let savedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    // parse--> خارج میکنه string از حالت
    savedTodos.forEach((todo) => {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo');
        const newTodo = ` <li>${todo}</li>
            <span><i class="fa-regular fa-square-check"></i></span>
            <span><i class="fa-regular fa-pen-to-square"></i></span>
            <span><i class="fa-regular fa-trash-can"></i></span>`;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    // console.log(todo.children[0].innerText);
    const todos = [...todoList.childNodes];
    let savedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    const filteredTodos = savedTodos.filter((t) => t !== todo.children[0].innerText);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));


}




