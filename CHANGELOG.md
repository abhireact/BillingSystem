


Building a ToDo List with React Redux Toolkit: Explanation and Guide with Code
Here's a combined explanation and guide to building a simple todo list using React Redux Toolkit, along with code snippets:

1. Project Setup:

Create a new React project using create-react-app:

Bash
npx create-react-app my-todo-app
Install required dependencies:

Bash
cd my-todo-app
npm install @reduxjs/toolkit react-redux
2. Redux Setup:
Create a folder called redux inside src.

Inside redux/todoSlice.js, define your Redux slice:

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    deleteToDo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addToDo, deleteToDo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;

This slice defines the initial state (empty todo list), actions for adding, deleting, and toggling todos, and the corresponding reducer functions.

3. Store Setup:

Create src/store.js:

JavaScript
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './redux/todoSlice';

const store = configureStore({
  reducer: {
    todoReducer,
  },
});

export default store;

This creates a Redux store with our todoReducer.

4. Provider Setup:
Edit   index.js:

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
Wrap your main App component with the Provider component and pass the Redux store 

5. Components:

Create src/components/AddTodo.js:

JavaScript
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToDo } from '../redux/todoSlice';

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addToDo(newTodo));
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo..." />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;

This component allows users to input new todo items and dispatches the addToDo action when submitted.

Create src/components/TodoItem.js:

JavaScript
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteToDo, toggleTodo } from '../redux/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteToDo(todo.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;

This component displays a single todo item with options to toggle completion and delete.

Create src/components/TodoList.js:


import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
  // Use useSelector to retrieve the todos from the Redux store
  const todos = useSelector((state) => state.todoReducer.todos);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {/* Render each todo item using TodoItem component */}
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
