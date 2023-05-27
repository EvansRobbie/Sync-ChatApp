import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import{ BrowserRouter as Router} from  'react-router-dom'
import AuthContextProvider from './context/AuthContext.tsx'
import ChatContextProvider from './context/ChatContext.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <Router>
        <Toaster
        position="top-center"
        reverseOrder={false}
      />
          <App />
        </Router>
      </ChatContextProvider>
    </AuthContextProvider>
  
  </React.StrictMode>,
)
