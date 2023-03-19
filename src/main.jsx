import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
/* import 'tw-elements'; */
import { UsersContextProvider } from './context/UsersContext'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <UsersContextProvider>
      <App />
    </UsersContextProvider>
    </AuthProvider>
   
  </React.StrictMode>,
)
