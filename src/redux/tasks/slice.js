import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations'; // Oперація logOut з файлу 'auth/operations.js'

// Асинхронні операції 'createAsyncThunk' з файлу 'tasks/operations.js'
import { fetchTasks, addTask, deleteTask } from './operations';

// Функція для обробки стану "pending"
const handlePending = state => {
  state.isLoading = true; // Встановлюємо статус завантаження
};

// Функція для обробки помилок 'rejected'
const handleRejected = (state, action) => {
  state.isLoading = false; // Встановлюємо статус завершення завантаження
  state.error = action.payload; // Зберігаємо повідомлення про помилку
};

// Cлайс для управління завданнями
const tasksSlice = createSlice({
  name: 'tasks', // Ім'я слайса
  initialState: {
    items: [], // Масив завдань
    isLoading: false, // Статус завантаження
    error: null, // Повідомлення про помилку
  },
  // 'extraReducers' для обробки 'зовнішніх екшенів' з асинхронних операцій, створених через createAsyncThunk (в файлі auth/operations.js)
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, handlePending) // Початок запиту
      // Якщо запит успішно виконано
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false; // Завершення завантаження
        state.error = null; // Очистка помилки
        state.items = action.payload; // Оновлення списку завдань
      })
      // Якщо запит не вдалося виконати
      .addCase(fetchTasks.rejected, handleRejected)
      .addCase(addTask.pending, handlePending) // Початок додавання завдання
      // Якщо завдання успішно додано
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false; // Завершення завантаження
        state.error = null; // Очистка помилки
        state.items.push(action.payload); // Додавання нового завдання до списку
      })
      .addCase(addTask.rejected, handleRejected) // Якщо додавання не вдалося
      .addCase(deleteTask.pending, handlePending) // Початок видалення завдання
      // Якщо завдання успішно видалено
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false; // Завершення завантаження
        state.error = null; // Очистка помилки
        // Знаходимо завдання за його id
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        // Видаляємо завдання з масиву
        state.items.splice(index, 1);
      })
      .addCase(deleteTask.rejected, handleRejected) // Якщо видалення не вдалося
      // Якщо вихід з системи успішний
      .addCase(logOut.fulfilled, state => {
        state.items = []; // Очищення списку завдань
        state.error = null; // Очистка помилки
        state.isLoading = false; // Встановлення статусу завершення завантаження
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
