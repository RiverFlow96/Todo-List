import { useState } from "react"

import "./TodoForm.css"
import { Plus } from "lucide-react"

const TodoForm = ({ onAgregarNota }) => {
    const [textNote, setTextNote] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        if (textNote === "") {
            alert("No se pueden agregar notas vacias")
            return
        }

        const newNote = {
            text: textNote,
            completed: false
        }

        fetch("http://localhost:3000/notas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        })
            .then(response => response.json())
            .then(data => {
                onAgregarNota(data)
                setTextNote("")
            })

        console.log(textNote)
    }

    return (
        <div className="w-full text-center">
            <div className="flex flex-col items-center">
                <h2 className="font-bold text-3xl my-0 align-middle font-sans text-blue-950">Todo List</h2>
                <form className="flex items-center flex-col" onSubmit={handleSubmit}>
                    <div className="bg-neutral-100 w-full ml-4 mt-0 mb-5 align-middle flex items-stretch overflow-hidden rounded-l-lg rounded-r-lg shadow-xs shadow-gray-600">
                        <input
                            className="text-wrap text-[1.3rem] placeholder-neutral-400 w-full h-10 pl-4 outline-none "
                            type="text"
                            name="nota"
                            id="nota"
                            value={textNote}
                            onChange={(event) => setTextNote(event.target.value)}
                            placeholder="Escribir tarea..."
                        />
                        <button
                            // className="font-bold text-center cursor-pointer bg-slate-600 w-[5dvw] h-[4dvh] box-border align-middle text-white border-2 border-black rounded-full"
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