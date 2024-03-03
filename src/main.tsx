import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import { AuthProvider } from './utils/AuthContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    
    <AuthProvider>
      <App />
      </AuthProvider>
  </React.Fragment>,
)
