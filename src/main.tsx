import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './index.css'
import './i18n.ts'

const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  throw new Error('Missing #root element!')
}
