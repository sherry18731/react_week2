import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import AppDemo from './AppDemo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppDemo />
  </StrictMode>,
)
