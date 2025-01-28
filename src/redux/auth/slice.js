import { createSlice } from '@reduxjs/toolkit';

// Асинхронні операції 'createAsyncThunk' з файлу 'auth/operations.js'
import { register, logIn, logOut, refreshUser } from './operations';

// Слайс для управління станом аутентифікації користувача
const authSlice = createSlice({
  name: 'auth', // Ім'я слайса
  // Початковий стан
  initialState: {
    user: {
      name: null, // Ім'я користувача
      email: null, // Email користувача
    },
    token: null, // Токен для аутентифікації
    isLoggedIn: false, // Статус логіну
    isRefreshing: false, // Статус оновлення даних користувача
  },
  // 'extraReducers' для обробки 'зовнішніх екшенів' з асинхронних операцій, створених через createAsyncThunk (в файлі auth/operations.js)
  extraReducers: builder => {
    builder
      // Якщо реєстрація успішна
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user; // Оновлення даних користувача
        state.token = action.payload.token; // Зберігання токена
        state.isLoggedIn = true; // Встановлення статусу входу в систему
      })
      // Якщо логін успішний
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // Якщо вихід з системи успішний
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null }; // Очищення даних користувача
        state.token = null; // Очищення токена
        state.isLoggedIn = false; // Встановлення статусу виходу з системи
      })
      // Якщо дані користувача оновлюються
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true; // Встановлення статусу "завантаження"
      })
      // Якщо дані користувача оновлено успішно
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload; // Оновлення даних користувача
        state.isLoggedIn = true; // Встановлення статусу входу
        state.isRefreshing = false; // Встановлення статусу завершення оновлення
      })
      // Якщо оновлення даних користувача не вдалося
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false; // Встановлення статусу завершення
      });
  },
});

export const authReducer = authSlice.reducer;
