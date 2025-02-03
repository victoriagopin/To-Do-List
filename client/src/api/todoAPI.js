import { del, get, post, put } from "./requester";

export async function  getAllTodos() {
    const todos = get('data/todo');
    return todos;
}

export async function getSingleTodo(id) {
    const todo = await get(`data/todo/${id}`);
    return todo;
}

export async function  createTodo(data) {
    const createdTodo = await post('data/todo', data);
    return createdTodo;
}

export async function updateTodo(id, data) {
    const todo = await put(`data/todo/${id}`, data);
    return todo;
}

export async function  deleteTodo(id) {
    const deleted = await del(`data/todo/${id}`);
    return deleted;
}

export async function logout(){
    const res = await get('users/logout');
    return res;
}