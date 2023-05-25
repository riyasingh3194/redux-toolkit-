import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const todoIndex = state.findIndex((todo) => todo.id === action.payload);
      if (todoIndex !== -1) {
        state.splice(todoIndex, 1);
      }
    },
    toggleTodoStatus: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = todo.status === 'pending' ? 'completed' : 'pending';
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodoStatus } = todosSlice.actions;

export default todosSlice.reducer;
