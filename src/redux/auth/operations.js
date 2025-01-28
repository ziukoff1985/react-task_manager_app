import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://task-manager-api.goit.global/'; // Базовий URL для запитів

// Функція для додавання токена до заголовків запитів
const setAuthHeader = token => {
  // Додаємо токен до заголовка Authorization у всіх запитах
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Функція для очищення токена з заголовків запитів
const clearAuthHeader = () => {
  // Очищаємо заголовок Authorization
  axios.defaults.headers.common.Authorization = '';
};

/*
 * Операція реєстрації користувача
 * POST запит на /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register', // Назва операції
  async (credentials, thunkAPI) => {
    try {
      // POST запит для реєстрації користувача
      const res = await axios.post('/users/signup', credentials);
      // Після успішної реєстрації додаємо токен у заголовок (headers) запиту
      setAuthHeader(res.data.token);
      return res.data; // Повертаємо дані користувача (якщо реєстрація була успішною)
    } catch (error) {
      // Якщо сталася помилка, відхиляємо операцію з помилкою
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * Операція логіну користувача
 * POST запит на /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  'auth/login', // Назва операції
  async (credentials, thunkAPI) => {
    try {
      // POST запит для входу користувача
      const res = await axios.post('/users/login', credentials);
      // Після успішного логіну додаємо токен у заголовок запиту
      setAuthHeader(res.data.token);
      // Повертаємо дані користувача та токен
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * Операція лог-ауту користувача
 * POST запит на /users/logout
 * Заголовок: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    // POST запит для завершення сесії (лог-ауту)
    await axios.post('/users/logout');
    // Після успішного лог-ауту очищаємо токен з заголовків (headers)
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * Операція для оновлення даних користувача
 * GET запит на /users/me
 * Заголовок: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Отримуємо поточний стан Redux (зберігається токен у стані)
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token; // Отримуємо токен з стану

    // Якщо токена немає, повертаємо помилку
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // Якщо токен є, додаємо його до заголовків запитів (headers)
      setAuthHeader(persistedToken);
      // GET запит для отримання даних користувача
      const res = await axios.get('/users/me');
      // Повертаємо дані користувача, якщо запит успішний
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
