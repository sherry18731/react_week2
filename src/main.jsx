import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import AppDemo from './AppDemo.jsx'
import store from './redux/store.js';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <AppDemo />
    </Provider>
  // </StrictMode>,
)
