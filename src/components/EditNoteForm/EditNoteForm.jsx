import "../TodoAPP.css"
import { useState } from "react"

const EditNoteForm = ({ nota, onEditarNote, onCancelar }) => {

    const [textoEditado, setTextoEditado] = useState()

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
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

            const notaActualizada = await response.json()

            onEditarNote(notaActualizada)
            onCancelar()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col box-border items-center">
            <input
                className="box-border bg-gray-200 w-2xs  h-8 align-middle  shadow-md shadow-gray-600 border-black border-2 rounded-2xl"
                type="text"
                value={textoEditado}
                onChange={(e) => setTextoEditado(e.target.value)}
            />
            <button
                className="bg-slate-600 rounded-full w-2xs size-10 text-white flex items-center justify-center border-white border-2 shadow-md shadow-slate-700"
                type="submit"
            >
                Guardar
            </button>
            <button className="bg-slate-600 rounded-full w-2xs size-10 text-white flex items-center justify-center border-white border-2 shadow-md shadow-slate-700" type="button" onClick={onCancelar}>Cancelar</button>

        </form>
    )
}

export default EditNoteForm