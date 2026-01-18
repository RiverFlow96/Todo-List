import "../TodoAPP.css"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setTextoEditado } from "../../features/textoEditadoSlice"
import { useEffect } from "react"

// Componente EditNoteForm para editar una nota existente
const EditNoteForm = ({ nota, onEditarNote, onCancelar }) => {

    // Estado para guardar el texto editado de la nota
    const textoEditado = useSelector((state) => state.textoEditado.value)
    const dispatch = useDispatch()

    // Hook useEffect para inicializar el estado de Redux con el texto de la nota actual
    useEffect(() => {
        dispatch(setTextoEditado(nota.text ?? ""));
    }, [nota.text, dispatch]); // Se ejecuta cuando el texto de la nota cambia o el dispatch cambia (raro)


    // Manejador de eventos para el envío del formulario al guardar cambios
    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            // Llamada a la API para actualizar el texto de la nota
            const response = await fetch(`http://localhost:3000/notas/${nota.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: textoEditado })
            })

            if (!response.ok) {
                throw new Error(`Error http: ${response.status}`)
            }

            // Analiza la nota actualizada de la respuesta
            const notaActualizada = await response.json()

            // Callback para actualizar la nota en el estado del componente padre
            onEditarNote(notaActualizada)
            // Callback para cancelar el modo de edición
            onCancelar()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col box-border items-center">
            {/* Campo de entrada para editar el texto de la nota */}
            <input
                className="box-border bg-gray-200 w-2xs  h-8 align-middle  shadow-md shadow-gray-600 border-black border-2 rounded-2xl"
                type="text"
                value={textoEditado}
                onChange={(e) => dispatch(setTextoEditado(e.target.value))}
            />
            {/* Botón para guardar la nota editada */}
            <button
                className="bg-slate-600 rounded-full w-2xs size-10 text-white flex items-center justify-center border-white border-2 shadow-md shadow-slate-700"
                type="submit"
            >
                Guardar
            </button>
            {/* Botón para cancelar la edición y descartar cambios */}
            <button className="bg-slate-600 rounded-full w-2xs size-10 text-white flex items-center justify-center border-white border-2 shadow-md shadow-slate-700" type="button" onClick={onCancelar}>Cancelar</button>

        </form>
    )
}

export default EditNoteForm