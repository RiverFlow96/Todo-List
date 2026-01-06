import "./ButtonChecked.css"

const ButtonChecked = ({ nota, onEditarNote }) => {

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

            console.log(notaActualizada)

            onEditarNote(notaActualizada)

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <input className="size-5 align-middle" type="checkbox" onChange={handleOnChange} />
    )
}

export default ButtonChecked