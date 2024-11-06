import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Taskcontext from './context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <Taskcontext>
    <App />
  </Taskcontext>
)
