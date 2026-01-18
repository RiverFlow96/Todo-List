import { createSlice } from "@reduxjs/toolkit";

export const textoEditadoSlice = createSlice({
    name: "notas",
    initialState: {
        value: "",
    },
    reducers: {
        // Acción para establecer la lista de notas
        setTextoEditado: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setTextoEditado } = textoEditadoSlice.actions;
export default textoEditadoSlice.reducer