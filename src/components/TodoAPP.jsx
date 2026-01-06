import { useState, useEffect, use, act } from "react"
import TodoForm from "./TodoForm/TodoForm"
import { Edit, SquarePen, Trash } from "lucide-react"
import EditNoteForm from "./EditNoteForm/EditNoteForm"
import "./TodoAPP.css"
import ButtonChecked from "./Buttons/ButtonChecked"

function TodoAPP({ }) {
    const [notas, setNotas] = useState([])
    const [notaEditandoId, setNotaEditandoId] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/notas")
                if (!response.ok) {
                    throw new Error(`Error http: ${response.status}`)
                }

                const data = await response.json()

                setNotas(data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    // map = retorna una array

    const agregarNota = (nuevaNota) => {
        setNotas([...notas, nuevaNota])
    }

    const handleClickDelete = (id) => {
        setNotas(notas.filter(nota => nota.id !== id))
        fetch(`http://localhost:3000/notas/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al eliminar la nota: ${response.status}`)
                }
                console.log("Nota eliminada")
            })
            .catch(error => console.log(error))
    }

    const actualizarNota = (notaActualizada) => {
        setNotas(notas.map(nota => {
            return nota.id === notaActualizada.id ? notaActualizada : nota
        }))
    }

    return (
        <div className="max-w-[70dvw] bg-white shadow-md shadow-slate-800 rounded-2xl p-5">
            <TodoForm onAgregarNota={agregarNota}></TodoForm>
            <div className="flex pt-0 pb-5 items-center w-full">
                <div className="grow border-t border-gray-400"></div>
            </div >
            <ul className="p-2 h-100 overflow-y-auto">
                {notas.map(nota => <li className="my-3 text-[1.3rem] flex flex-row justify-between" key={nota.id}>
                    <span>
                        <ButtonChecked nota={nota} onEditarNote={actualizarNota}></ButtonChecked> {nota.text}
                    </span>
                    <div className="flex items-center">
                        <SquarePen className="hover:shadow-md hover:shadow-green-400" strokeWidth="1.5px" onClick={() => setNotaEditandoId(nota.id)} size={26} />
                        <Trash className="hover:shadow-md hover:shadow-red-400" strokeWidth="1.5px" onClick={() => handleClickDelete(nota.id)} size={26} />
                    </div>
                    {
                        notaEditandoId === nota.id && (
                            <EditNoteForm
                                nota={nota}
                                onEditarNote={actualizarNota}
                                onCancelar={() => setNotaEditandoId(null)}
                            />
                        )
                    }
                </li>)}
            </ul>
        </div >
    )
}

export default TodoAPP