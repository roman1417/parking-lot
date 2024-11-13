import { Link } from 'react-router-dom'

import Area from '../../models/area'
import classes from './AreaItem.module.css'
import { currencyFormatter } from '../../utils/currency'

interface Props {
    area: Area
}

const AreaItem = ({ area }: Props) => {
    const { id, name, weekdaysRate, weekendRate, discount } = area
    return (
        <li className={classes.item}>
            <Link to={`/area/${id}`}>
                <span className={classes.row}>
                    <span>
                        Name: <strong>{name}</strong>
                    </span>
                    <span>
                        Discount: <strong>{discount}%</strong>
                    </span>
                </span>
                <span className={classes.row}>
                    <span>
                        Weekdays hourly rate:{' '}
                        <strong>
                            {currencyFormatter('en-US', 'USD', weekdaysRate)}
                        </strong>
                    </span>
                    <span>
                        Weekend hourly rate:{' '}
                        <strong>
                            {currencyFormatter('en-US', 'USD', weekendRate)}
                        </strong>
                    </span>
                </span>
            </Link>
        </li>
    )
}

export default AreaItem
