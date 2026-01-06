import "./ButtonChecked.css"
import { useState } from "react"

const ButtonChecked = ({ nota, onEditarNote, texto }) => {

    const [decoration, setDecoration] = useState(false)

    const handleOnChange = async (e) => {
        e.preventDefault()

        try {
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

            const notaActualizada = await response.json()

            e.target.checked = notaActualizada.completed
            setDecoration(notaActualizada.completed)

            onEditarNote(notaActualizada)

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className="flex items-center">
            <input className="accent-slate-600 size-5 mr-5" type="checkbox" onChange={handleOnChange} />
            <p className={`${decoration ? "line-through" : "decoration-0"}`}>{texto}</p>
        </div>
    )
}

export default ButtonChecked