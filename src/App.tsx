import { RouterProvider } from 'react-router-dom'

import router from './routes/router'
import AreasContextProvider from './store/areas-context'

function App() {
    return (
        <AreasContextProvider>
            <RouterProvider router={router} />
        </AreasContextProvider>
    )
}

export default App
