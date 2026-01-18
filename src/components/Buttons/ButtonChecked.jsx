import "./ButtonChecked.css"
import { useState } from "react"

// Componente ButtonChecked para mostrar y gestionar un solo elemento de la lista de tareas
const ButtonChecked = ({ nota, onEditarNote, texto }) => {

    // Estado para gestionar la decoración del texto (por ejemplo, tachado para tareas completadas)
    const [decoration, setDecoration] = useState(false)

    // Manejador de eventos para el cambio del checkbox, actualiza el estado de completado de una nota
    const handleOnChange = async (e) => {
        e.preventDefault()

        try {
            // Llamada a la API para actualizar el estado 'completed' de la nota
            const response = await fetch(`http://localhost:3000/notas/${nota.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ completed: e.target.checked })
            })

            if (!response.ok) {
                throw new Error(`Error http: ${response.status}`)
            }

            // Analiza la nota actualizada de la respuesta
            const notaActualizada = await response.json()

            // Actualiza el estado del checkbox y la decoración basándose en la nota actualizada
            e.target.checked = notaActualizada.completed
            setDecoration(notaActualizada.completed)

            // Callback para actualizar la nota en el componente padre
            onEditarNote(notaActualizada)

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className="flex items-center">
            {/* Input de checkbox para marcar una nota como completada */}
            <input className="accent-slate-600 size-5 mr-5" type="checkbox" onChange={handleOnChange} />
            {/* Muestra el texto de la nota, aplicando tachado si está completada */}
            <p className={`${decoration ? "line-through text-neutral-500" : "decoration-0 text-black"}`}>{texto}</p>
        </div>
    )
}

export default ButtonChecked