import { Outlet } from 'react-router-dom'

import Navigation from '../components/Navigation'

const RootLayout = () => {
    // const navigation = useNavigation()

    return (
        <>
            <Navigation />
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout
