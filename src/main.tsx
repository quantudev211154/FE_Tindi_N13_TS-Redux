import { ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { MUI_THEME_CONFIG } from './config/MUIThemeConfig'
import './index.css'
import { store } from './redux_store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={MUI_THEME_CONFIG}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
