import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';
import selectedItemsReducer from './selectedItemsSlice';

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        selectedItems: selectedItemsReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState({
        selectedItems: store.getState().selectedItems,
    });
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
