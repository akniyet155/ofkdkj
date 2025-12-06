import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Register Service Worker for offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/ofkdkj/sw.js').catch(() => {});
}

// Инициализация Telegram Web App SDK если доступен
if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
