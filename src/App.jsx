import TodoAPP from './components/TodoAPP'
import { useState } from 'react'
import "./index.css"

// <></> - fragment

// Pasar Props

function App() {

  return (
    <div className='w-dvw h-dvh flex items-center justify-center'>
      <TodoAPP></TodoAPP >
    </div>
  )


}

export default App
