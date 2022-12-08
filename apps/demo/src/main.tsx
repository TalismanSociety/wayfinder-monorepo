import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { AppProvider } from './AppProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
)
