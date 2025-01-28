import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
 * Операція для отримання всіх завдань
 * GET запит на /tasks
 */
export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll', // Назва операції в Redux
  async (_, thunkAPI) => {
    try {
      // GET запит для отримання всіх завдань
      const res = await axios.get('/tasks');
      return res.data; // Повертаємо список завдань, якщо запит успішний
    } catch (error) {
      // Якщо сталася помилка, відхиляємо операцію з помилкою
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * Операція для додавання нового завдання
 * POST запит на /tasks
 */
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (text, thunkAPI) => {
    // POST запит для додавання нового завдання
    try {
      const res = await axios.post('/tasks', { text });
      return res.data; // Повертаємо дані нового завдання, якщо запит успішний
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// DELETE @ /tasks/:id
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
