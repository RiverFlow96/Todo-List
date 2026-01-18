import { useState, useEffect, use, act } from "react"
import { Edit, SquarePen, Trash } from "lucide-react"
import TodoForm from "./TodoForm/TodoForm"
import EditNoteForm from "./EditNoteForm/EditNoteForm"
import ButtonChecked from "./Buttons/ButtonChecked"
import "./TodoAPP.css"
import { useSelector, useDispatch } from "react-redux"
import { setNotas, addNota, updateNota, setNotaEditandoId } from "../features/notasSlice"

// Componente TodoAPP, el contenedor principal para la aplicación de lista de tareas
function TodoAPP({ }) {
    // Estado para almacenar la lista de notas
    const notas = useSelector((state) => state.notas.value)
    const dispatch = useDispatch()
    // Estado para gestionar qué nota se está editando actualmente
    const notaEditandoId = useSelector((state) => state.notas.notaEditandoId);

    // Hook useEffect para obtener notas de la API al montar el componente
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
    }, []) // Un array de dependencias vacío significa que este efecto se ejecuta una vez después del renderizado inicial

    // map = devuelve un array

    // Función para añadir una nueva nota a la lista
    const agregarNota = (nuevaNota) => {
        dispatch(addNota(nuevaNota))
    }

    // Función para manejar la eliminación de una nota
    const handleClickDelete = (id) => {
        // Filtra la nota eliminada del estado
        dispatch(setNotas(notas.filter(nota => nota.id !== id)))
        // Llamada a la API para eliminar la nota del servidor
        fetch(`http://localhost:3000/notas/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al eliminar la nota: ${response.status}`)
                }
            })
            .catch(error => console.log(error))
    }

    // Función para actualizar una nota existente
    const actualizarNota = (notaActualizada) => {
        // Mapea sobre las notas y reemplaza la nota actualizada
        dispatch(updateNota(notaActualizada))
    }

    return (
        <div className="max-w-[60dvw] min-w-[40dvw] bg-white shadow-md shadow-slate-800 rounded-2xl p-5">
            {/* Componente TodoForm para añadir nuevas notas */}
            <TodoForm onAgregarNota={agregarNota}></TodoForm>
            <div className="flex pt-0 pb-5 items-center w-full">
                <div className="grow border-t border-gray-400"></div>
            </div >

            {/* Lista de notas */}
            <ul className="p-2 h-100 overflow-y-auto">
                {/* Itera sobre las notas y renderiza cada una */}
                {notas.map(nota => <li className={`my-3 text-[1.3rem] flex flex-row justify-between items-center align-middle`} key={nota.id}>
                    <span>
                        {/* Componente ButtonChecked para mostrar y marcar una nota como completada */}
                        <ButtonChecked texto={nota.text} nota={nota} onEditarNote={actualizarNota}></ButtonChecked>
                    </span>
                    <div className="flex items-center">
                        {/* Botón de editar */}
                        <SquarePen className="hover:shadow-md hover:shadow-green-400" strokeWidth="1.5px" onClick={() => dispatch(setNotaEditandoId(nota.id))} size={26} />
                        {/* Botón de eliminar */}
                        <Trash className="hover:shadow-md hover:shadow-red-400" strokeWidth="1.5px" onClick={() => handleClickDelete(nota.id)} size={26} />
                    </div>
                    {
                        // Renderiza condicionalmente el EditNoteForm si una nota está siendo editada
                        notaEditandoId === nota.id && (
                            <EditNoteForm
                                nota={nota}
                                onEditarNote={actualizarNota}
                                onCancelar={() => dispatch(setNotaEditandoId(null))}
                            />
                        )
                    }
                </li>)}
            </ul>
        </div >
    )
}

export default TodoAPP