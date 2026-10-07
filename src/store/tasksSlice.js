import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

// 1. OBTENER TAREAS DE FIRESTORE (Filtradas por el usuario autenticado)
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (userId) => {
    const q = query(collection(db, 'tasks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((document) => {
      tasks.push({ id: document.id, ...document.data() });
    });
    return tasks;
  }
);

// 2. AGREGAR TAREA A FIRESTORE
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ title, description, category, userId }) => {
    const newTask = {
      title,
      description: description || '',
      category: category || 'General',
      completed: false,
      userId,
      createdAt: new Date().toLocaleDateString(),
    };
    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    return { id: docRef.id, ...newTask };
  }
);

// 3. CAMBIAR ESTADO (COMPLETADA / PENDIENTE) EN FIRESTORE
export const toggleTaskStatus = createAsyncThunk(
  'tasks/toggleTaskStatus',
  async ({ id, completed }) => {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, { completed: !completed });
    return { id, completed: !completed };
  }
);

// 4. ELIMINAR TAREA EN FIRESTORE
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
    return id;
  }
);

const initialState = {
  items: [],
  filter: 'all', // 'all', 'completed', 'pending'
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Cargar tareas
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Agregar tarea
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Cambiar estado
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const task = state.items.find((t) => t.id === action.payload.id);
        if (task) {
          task.completed = action.payload.completed;
        }
      })
      // Eliminar tarea
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload.id);
      });
  },
});

export const { setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;