import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

import PageContent from '../components/PageContent'
import Navigation from '../components/Navigation'

const ErrorPage = () => {
    const error = useRouteError()

    let title = 'An error occoured!'
    let message = 'Something went wrong!'

    if (isRouteErrorResponse(error) && error.status === 404) {
        title = 'Not found!'
        message = 'Could not found resource or page.'
    }

    return (
        <>
            <Navigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage
