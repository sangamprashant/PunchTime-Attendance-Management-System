import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SidebarProvider } from './providers/SidebarContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthenticationContext.tsx'
import { BranchesProvider } from './pages/(admin)/(branches)/branches.context.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <BranchesProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </BranchesProvider>
      </AuthProvider>
    </BrowserRouter>
  </>
)
