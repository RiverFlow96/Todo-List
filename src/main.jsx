import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.ts'
import App from './App.jsx'

// Renderiza la aplicación principal de React
createRoot(document.getElementById('root')).render(
  // StrictMode para resaltar posibles problemas en una aplicación
  <Provider store={store}>
    {/* El componente raíz de la aplicación */}
    <App />
  </Provider>,
)
