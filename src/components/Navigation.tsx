import { NavLink } from 'react-router-dom'

import classes from './Navigation.module.css'

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Managment
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/payment"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Payment
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation
