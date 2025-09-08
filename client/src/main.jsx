import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import Store from './Redux/Store.js'
import {Provider} from 'react-redux'
import { persistore } from './Redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistore}>
       <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)
