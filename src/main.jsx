import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'
import ErrorBoundary from './utils/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback='Oops an Error happend, please reload the page.' >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
