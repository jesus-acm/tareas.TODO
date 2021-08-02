import { Todo } from "../classes";

import { todoList } from "../index";

// Referencias en el html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnDelete = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div;
}


//Eventos
txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){
       const newTodo = new Todo(txtInput.value);

       todoList.newTodo(newTodo);
       crearTodoHtml(newTodo);
       txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nameElement = event.target.localName; // input, label, button
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');
    console.log(event);

    if(nameElement.includes('input')){
        todoList.toggleCompleted(todoId);
        todoElement.classList.toggle('completed')
    }else if(nameElement.includes('button')){
        todoList.deleteTodo(todoId);
        divTodoList.removeChild(todoElement);
    }
    console.log(todoList);
});

btnDelete.addEventListener('click', () => {
    todoList.deleteCompleted();

    for(let i = divTodoList.children.length - 1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilters.addEventListener('click', event => {
    console.log(event.target.text);
    const filter = event.target.text;
    if(!filter) return;

    anchorFilters.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected')


    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch(filter){
            case 'Pendientes':
                if(completed){
                    element.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completed){
                    element.classList.add('hidden');
                }
            break;
        }
    }
});