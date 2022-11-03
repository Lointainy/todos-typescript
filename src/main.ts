/* Types */

import { todoType } from './types'

const addButton = document.querySelector<HTMLButtonElement>('.btn__add')

const todoName = document.querySelector<HTMLInputElement>('.todo__name')

const todoList = document.querySelector<HTMLUListElement>('.todo__list')

const todoCategory = document.querySelector<HTMLSelectElement>('.todo__categoty')

/* Store */

let todos: todoType[] = []
let category: string[] = ['work', 'home', 'other']

/* Watch */

todoCategory?.addEventListener('change', selectedCategory)
addButton?.addEventListener('click', handleAddTodo)
todoList?.addEventListener('click', handleChangeTodo)
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
	/* Small validation for input area */

	if (todoName!.value.length < 1) {
		addButton!.innerText = 'small title'
	} else {
		addButton!.innerText = 'add todo'
	}

	if (todoName!.value.length >= 1) {
		let todoId = getRandomId()
		let todo = document.createElement('li')
		todo.setAttribute('id', `${todoId}`)

		todos = [...todos, { title: todoName!.value, id: todoId, status: false, category: selectedCategory() }] // push new TODO
		setLocalTodos()

		todo.innerHTML = `
		<input type="checkbox" class="todo__status"/>
    <input type="text" value="${todoName!.value}" readonly class="todo__title"/>
	<span>${selectedCategory()}</span>
    <button type="button" class="btn__edit">edit</button>
    <button type="button" class="btn__remove">remove</button>
    `
		todoList?.appendChild(todo)
		todoName!.value = '' //reset input
	}
}

/* CHANGE for TODO */

function handleChangeTodo(e: any) {
	let item = e.target
	let itemId = item.parentElement.id // get id <li id="?">
	let itemStatus = item.parentElement.children[0].checked // get COMPELETE TODO status
	let itemReadStatus = item.parentElement.children[1].readOnly // get READ TODO status
	let itemTitle = item.parentElement.children[1].value // get value from input

	/* If remove TODO */

	if (e.target.classList[0] === 'btn__remove') {
		todos = todos.filter((i) => i.id != itemId)
		// add filter TODOS
		setLocalTodos() // set to local
		todoList?.removeChild(document.getElementById(itemId) as HTMLElement)
	} // remove TODO from todos and set localstorage

	/* If edit TODO */

	if (e.target.classList[0] == 'btn__edit') {
		item.parentElement.children[1].readOnly = !itemReadStatus // toggle status for input

		e.target.innerText = itemReadStatus ? 'close' : 'edit' // toggle title for EDIT button

		todos = todos.map((todo) => (todo.id == itemId ? { ...todo, title: itemTitle } : todo))
		// add change for selected TODO
		setLocalTodos() // set to localStorage
	}

	/* If change TODO status */

	if (e.target.classList[0] == 'todo__status') {
		todos = todos.map((todo) => (todo.id == itemId ? { ...todo, status: itemStatus } : todo))
		// add change status for selected TODO
		setLocalTodos() // set to localStorage
	}
}

function onMounted() {
	/* Create category after loaded document */

	for (let i = 0; i < category.length; i++) {
		let categoryItem = document.createElement('option')
		categoryItem.setAttribute('id', `${getRandomId()}`)
		categoryItem.innerText = category[i]
		categoryItem.value = category[i]
		todoCategory!.appendChild(categoryItem)
	}

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

	for (let i = 0; i < todos.length; i++) {
		let todo = document.createElement('li')
		todo.setAttribute('id', `${todos[i].id}`)
		let todoStatus = todos[i].status ? 'checked' : ''
		todo.innerHTML = `
				<input type="checkbox" class="todo__status" ${todoStatus}>
    <input type="text" value="${todos[i].title}" readonly class="todo__title"/>
	<span>${todos[i].category}</span>
    <button type="button" class="btn__edit">edit</button>
    <button type="button" class="btn__remove">remove</button>
    `
		todoList?.appendChild(todo)
	}
}

