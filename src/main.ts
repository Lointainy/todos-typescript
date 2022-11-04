import { setTheme, toggleTheme } from './theme'

/* Types */
import { todoType } from './types'

const addButton = document.querySelector<HTMLButtonElement>('.todo__btn-add')
const todoName = document.querySelector<HTMLInputElement>('.todo__name')
const todoList = document.querySelector<HTMLUListElement>('.todos-list')
const todoCategory = document.querySelector<HTMLSelectElement>('.todo__category')
const toggleThemeButton = document.querySelector<HTMLButtonElement>('.header-menu__theme')

/* Store */
let todos: todoType[] = []
let category: string[] = ['work', 'home', 'other']

/* Watch */
todoCategory?.addEventListener('change', selectedCategory)
addButton?.addEventListener('click', handleAddTodo)
todoList?.addEventListener('click', handleChangeTodo)

toggleThemeButton?.addEventListener('click', toggleTheme)
document.addEventListener('DOMContentLoaded', onMounted)

/* FUNCTIONS */
function selectedCategory() {
	return todoCategory!.value
} // get value from selected option

const getRandomId = () => {
	return Math.floor(Math.random() * 100)
} // create random id for new TODO

const setLocalTodos = () => {
	return localStorage.setItem('todos', JSON.stringify(todos))
} // set new TODO to localStorage

const getLocalTodos = () => {
	return JSON.parse(localStorage.getItem('todos') || '')
} // get TODOS from localStorage

/* ADD TODO */
function handleAddTodo() {
	todoName!.value.length < 1 ? (todoName!.placeholder = 'small title') : (todoName!.placeholder = 'add new todos')

	if (todoName!.value.length >= 1) {
		let todoId = getRandomId()

		todoList!.innerHTML += `
		<li id="${todoId}" class="todos-list__item">
			<input type="checkbox" class="item__status">
			<input type="text" value="${todoName!.value}" readonly class="item__title"/>
			<span>${selectedCategory()}</span>
			<button type="button" class="item__btn-edit btn">edit</button>
			<button type="button" class="item__btn-remove btn">remove</button>
		</li>`

		todos = [...todos, { title: todoName!.value, id: todoId, status: false, category: selectedCategory() }] // push new TODO
		setLocalTodos()

		todoName!.value = '' //reset input
	}
}

/* CHANGE for TODO */
function handleChangeTodo({ target }: any) {
	/* If remove TODO */
	if (target.classList[0] === 'item__btn-remove') {
		todos = todos.filter((i) => i.id != target.parentElement.id) // add filter TODOS
		setLocalTodos() // set to local
		todoList?.removeChild(document.getElementById(target.parentElement.id) as HTMLElement)
	} // remove TODO from todos and set localstorage

	/* If edit TODO */
	if (target.classList[0] == 'item__btn-edit') {
		for (let todo of target.parentElement.children) {
			if (todo.className == 'item__title') {
				todo.readOnly = !todo.readOnly
				target.innerText = !todo.readOnly ? 'close' : 'edit' // toggle title for EDIT button
				!todo.readOnly ? todo.focus() : ''
				todos = todos.map((item) => (item.id == target.parentElement.id ? { ...item, title: todo.value } : item)) // add change for selected TODO
			}
		}
		setLocalTodos() // set to localStorage
	}

	/* If change TODO status */
	if (target.classList[0] == 'item__status') {
		for (let todo of target.parentElement.children) {
			if (todo.className == 'item__status') {
				todos = todos.map((item) => (item.id == target.parentElement.id ? { ...item, status: todo.checked } : item)) // add change status for selected TODO
			}
		}
		setLocalTodos() // set to localStorage
	}
}

function onMounted() {
	/* Create category after loaded document */
	for (let categoryItem of category) {
		todoCategory!.innerHTML += `<option id="${getRandomId()}" value="${categoryItem}">${categoryItem} </option>`
	}

	setTheme()

	/* Get elemet from localStorage */
	if (getLocalTodos() === null) {
		todos = []
	} else {
		todos = getLocalTodos()
		getTodos()
	}
}

function getTodos() {
	/* Create TODOS if localstorage is not empty */
	for (let todo of todos) {
		todoList!.innerHTML += `
		<li id="${todo.id}" class="todos-list__item">
			<input type="checkbox" class="item__status" ${todo.status ? 'checked' : ''}>
   			<input type="text" value="${todo.title}" readonly class="item__title"/>
			<span>${todo.category}</span>
    		<button type="button" class="item__btn-edit btn">edit</button>
    		<button type="button" class="item__btn-remove btn">remove</button>
		</li>`
	}
}

