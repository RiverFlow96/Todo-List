import { useState } from "react"

import "./TodoForm.css"
import { Plus } from "lucide-react"

// Componente TodoForm para añadir nuevas notas
const TodoForm = ({ onAgregarNota }) => {
    // Estado para gestionar el texto de entrada de una nueva nota
    const [textNote, setTextNote] = useState("")

    // Manejador de eventos para el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault()

        // Evita añadir notas vacías
        if (textNote === "") {
            alert("No se pueden agregar notas vacias")
            return
        }

        // Crea un nuevo objeto de nota
        const newNote = {
            text: textNote,
            completed: false
        }

        // Llamada a la API para añadir una nueva nota
        fetch("http://localhost:3000/notas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        })
            .then(response => response.json())
            .then(data => {
                // Callback para añadir la nueva nota al estado del componente padre
                onAgregarNota(data)
                // Limpia el campo de entrada después de añadir la nota
                setTextNote("")
            })

        console.log(textNote)
    }

    return (
        <div className="w-full text-center">
            <div className="flex flex-col items-center">
                {/* Título de la Lista de Tareas */}
                <h2 className="font-extrabold text-3xl my-0 align-middle font-sans text-red-800">Todo List</h2>
                {/* Formulario para añadir nuevas tareas */}
                <form className="flex items-center flex-col w-[60%]" onSubmit={handleSubmit}>
                    <div className="bg-neutral-100 w-full ml-4 mt-0 mb-5 align-middle flex items-stretch overflow-hidden rounded-l-lg rounded-r-lg shadow-xs shadow-gray-600">
                        {/* Campo de entrada para el texto de la nueva tarea */}
                        <input
                            className="text-wrap text-[1.3rem] placeholder-neutral-400 w-full h-10 pl-4 outline-none "
                            type="text"
                            name="nota"
                            id="nota"
                            value={textNote}
                            onChange={(event) => setTextNote(event.target.value)}
                            placeholder="Escribir tarea..."
                        />
                        {/* Botón para enviar la nueva tarea */}
                        <button
                            className="rounded-r-lg align-middle bg-slate-600 px-4 flex items-center justify-center cursor-pointer transition-color "
                            type="submit"
                        >
                            <Plus color="white" size={27}></Plus>
                        </button>
                    </div>
                    <div className="mb-3 flex justify-between">

                    </div>
                </form>
            </div>
        </div>
    )
}

export default TodoForm