// Селектор для отримання статусу входу користувача (isLoggedIn) з глобального стану
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

// Селектор для отримання даних користувача (user) з глобального стану
export const selectUser = state => state.auth.user;

// Селектор для отримання статусу оновлення даних користувача (isRefreshing) з глобального стану
export const selectIsRefreshing = state => state.auth.isRefreshing;
