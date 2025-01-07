import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Login from './pages/login.jsx'
import Add_employee from './pages/add_employee.jsx'
import Update_employee from './pages/update_employee.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Login />
    <Add_employee />
    <Update_employee />
  </StrictMode>,
)
