import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: '1',
      title: 'Ir a clases',
      description: 'Hora 20:30 biología',
      category: 'Estudio',
      completed: false,
    },
    {
      id: '2',
      title: 'Comprar insumos',
      description: 'Leche, pan, frutas',
      category: 'Personal',
      completed: false,
    },
  ],
  filter: 'all', // 'all', 'completed', 'pending'
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || '',
        category: action.payload.category || 'General',
        completed: false,
      };
      state.items.push(newTask);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;