import { createBrowserRouter } from 'react-router-dom'

import LayoutDefault from '../layouts/LayoutDefault'
import Home from '../pages/Home'
import Payment from '../pages/Payment'
import EditArea from '../pages/EditArea'
import NewArea from '../pages/NewArea'
import Error from '../pages/Error'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutDefault />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/payment',
                element: <Payment />,
            },
            {
                path: '/area/:id',
                element: <EditArea />,
            },
            {
                path: '/new-area',
                element: <NewArea />,
            },
        ],
    },
])

export default router
