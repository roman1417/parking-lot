import { useContext } from 'react'

// import Area from '../../models/area'
import { AreasContext } from '../../store/areas-context'
import AreaItem from './AreaItem'
import classes from './AreasList.module.css'

const AreasList = () => {
    const { areas } = useContext(AreasContext)
    return (
        <div className={classes.areas}>
            <h2>Parking-areas list</h2>
            <ul className={classes.list}>
                {areas.map(area => (
                    <AreaItem key={area.id} area={area} />
                ))}
            </ul>
        </div>
    )
}

export default AreasList
