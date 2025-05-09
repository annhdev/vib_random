import { createBrowserRouter } from 'react-router-dom'

import ErrorLayout from '@/layouts/ErrorLayout'
import MainLayout from '@/layouts/MainLayout'
import ErrorPage from '@/pages/Error'
import HomePage from '@/pages/Home'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
        ],
    },
    {
        path: '*',
        element: <ErrorLayout />,
        children: [
            {
                path: '*',
                element: <ErrorPage />,
            },
        ],
    },
])

export default router
