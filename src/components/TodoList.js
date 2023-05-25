import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodoStatus, deleteTodo } from '../store/todosSlice';

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodoName, setNewTodoName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTodo = () => {
    if (newTodoName.trim() !== '') {
      dispatch(
        addTodo({
          name: newTodoName,
          id: Date.now().toString(),
          status: 'pending',
        })
      );
      setNewTodoName('');
    }
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const handleToggleStatus = (todoId) => {
    dispatch(toggleTodoStatus(todoId));
  };

  const incompleteTasksCount = todos.filter((todo) => todo.status === 'pending').length;

  const filteredTodos = todos.filter((todo) =>
    todo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search Todo"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br/>
      <input
        type="text"
        value={newTodoName}
        onChange={(e) => setNewTodoName(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <div>
        Total pending Tasks: {incompleteTasksCount}
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}
              onClick={() => handleToggleStatus(todo.id)}
            >
              {todo.name}
            </span>
            <button onClick={() => handleToggleStatus(todo.id)}>Complete</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
