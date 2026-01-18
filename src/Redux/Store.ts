import { configureStore } from "@reduxjs/toolkit"
import textNoteSlice from "../features/textNoteSlice"
import notasSlice from "../features/notasSlice";
import textoEditadoSlice from "../features/textoEditadoSlice";

// Configura la tienda (store) de Redux
export const store = configureStore({
    reducer: {
        // Añade tus reducers aquí
        textNote: textNoteSlice,
        notas: notasSlice,
        textoEditado: textoEditadoSlice,
    },
});


