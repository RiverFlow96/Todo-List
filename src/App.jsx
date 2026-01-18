import TodoAPP from './components/TodoAPP'
// useState es un Hook de React que te permite añadir variables de estado a tus componentes.
import { useState } from 'react'
import './index.css'

// <></> - fragment (un patrón común para que un componente devuelva múltiples elementos)

// Pasar Props (Las Props son argumentos pasados a los componentes de React.)

// Componente principal de la aplicación
function App() {

  return (
    // Contenedor principal div, centrando el componente TodoAPP
    <div className='w-dvw h-dvh flex items-center justify-center'>
      {/* Renderiza el componente TodoAPP */}
      <TodoAPP></TodoAPP >
    </div>
  )


}

export default App
