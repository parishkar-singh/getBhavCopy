
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemsState {
    items: string[];
}

const initialState: SelectedItemsState = {
    items: [],
};

const selectedItemsSlice = createSlice({
    name: 'selectedItems',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<string>) {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item !== action.payload);
        },
        setItems(state, action: PayloadAction<string[]>) {
            state.items = action.payload;
        },
    },
});

export const { addItem, removeItem, setItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
