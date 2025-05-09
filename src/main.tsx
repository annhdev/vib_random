import './global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import { StoreProvider } from '@/providers'
import router from '@/routes.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StoreProvider>
            <ToastContainer
                position='bottom-center'
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme='colored'
                transition={Bounce}
            />
            <RouterProvider router={router} />
        </StoreProvider>
    </StrictMode>
)
