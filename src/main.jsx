import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Landing from './Landing'
// import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


// atatus.config('1b1ee5665eb943e3bdb71259beabe47a').install();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Landing />
  </StrictMode>
)


serviceWorkerRegistration.register();
