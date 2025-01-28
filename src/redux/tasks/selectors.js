// Селектор для отримання статусу завантаження (loading) завдань з глобального стану
export const selectLoading = state => state.tasks.loading;

// Селектор для отримання фільтру завдань (filter) з глобального стану
export const selectFilter = state => state.tasks.filter;

// Селектор для отримання всіх завдань (items) з глобального стану
export const selectAllTasks = state => state.tasks.items;
