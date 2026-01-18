import { createSlice } from "@reduxjs/toolkit";

export const notasSlice = createSlice({
    name: "notas",
    initialState: {
        value: [],
        notaEditandoId: null,
    },
    reducers: {
        // Acción para establecer la lista de notas
        setNotas: (state, action) => {
            state.value = action.payload;
        },
        // Acción para agregar una nueva nota a la lista
        addNota: (state, action) => {
            state.value.push(action.payload);
        },
        // Acción para actualizar una nota existente en la lista
        updateNota: (state, action) => {
            const index = state.value.findIndex(nota => nota.id === action.payload.id);
            if (index !== -1) {
                state.value[index] = action.payload;
            }
        },
        setNotaEditandoId: (state, action) => {
            state.notaEditandoId = action.payload;
        }
    },
});

export const { setNotas, addNota, updateNota, setNotaEditandoId } = notasSlice.actions;

export default notasSlice.reducer