import { createSlice } from "@reduxjs/toolkit";

// Define el estado inicial para las notas de texto
export const textNoteSlice = createSlice({
    name: "textNote",
    initialState: {
        value: "",
    },
    reducers: {
        // Acción para actualizar la nota de texto
        setTextNote: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setTextNote } = textNoteSlice.actions;

export default textNoteSlice.reducer;