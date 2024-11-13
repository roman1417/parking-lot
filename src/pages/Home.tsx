import { Link } from 'react-router-dom'

import AreaList from '../components/area/AreasList'
import classes from './Home.module.css'

const Home = () => {
    return (
        <>
            <div className={classes.home}>
                <h1>Parking-areas management</h1>
                <Link to="/new-area">Add new parking-area</Link>
            </div>
            <AreaList />
        </>
    )
}

export default Home
