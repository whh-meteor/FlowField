import { createRoot } from 'react-dom/client';
import { Earth } from './pages/earth';
import { StrictMode } from 'react';


// Mount React app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Earth />
  </StrictMode>,
);
