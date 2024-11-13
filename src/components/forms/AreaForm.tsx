import { useRef, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AreasContext } from '../../store/areas-context'
import classes from './AreaForm.module.css'

interface Props {
    edit?: boolean
}

const AreaForm = ({ edit }: Props) => {
    const { areas, addArea, replaceArea, removeArea } = useContext(AreasContext)
    const nameInput = useRef<HTMLInputElement>(null)
    const weekdaysRateInput = useRef<HTMLInputElement>(null)
    const weekendRateInput = useRef<HTMLInputElement>(null)
    const discountInput = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const params = useParams()
    const id = params.id

    let defultName = ''
    let defaultWeekdaysRate = 0
    let defultWeekendRate = 0
    let defultdiscount = 0

    if (edit) {
        const cuurentArea = areas.find(area => area.id === id)
        defultName = cuurentArea?.name || ''
        defaultWeekdaysRate = cuurentArea?.weekdaysRate || 0
        defultWeekendRate = cuurentArea?.weekendRate || 0
        defultdiscount = cuurentArea?.discount || 0
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()

        const name = nameInput.current!.value
        const weekdaysRate = +weekdaysRateInput.current!.value
        const weekendRate = +weekendRateInput.current!.value
        const discount = +discountInput.current!.value || 0

        if (edit && id) {
            replaceArea(id, name, weekdaysRate, weekendRate, discount)
        } else {
            addArea(name, weekdaysRate, weekendRate, discount)
        }

        navigate('/')
    }

    function cancelHandler() {
        navigate('/')
    }

    function deleteHandler() {
        if (id) {
            removeArea(id)
        }
        navigate('/')
    }

    let actions = (
        <div className={classes.actions}>
            <button type="button" onClick={cancelHandler}>
                Cancel
            </button>
            <button>Add Area</button>
        </div>
    )

    if (edit) {
        actions = (
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler}>
                    Cancel
                </button>
                <button type="button" onClick={deleteHandler}>
                    Delete
                </button>
                <button>Save</button>
            </div>
        )
    }

    return (
        <form onSubmit={submitHandler}>
            <p>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    ref={nameInput}
                    defaultValue={defultName}
                    required
                />
            </p>
            <p>
                <label htmlFor="weekdays-rate">
                    Weekdays hourly rate (USD)
                </label>
                <input
                    type="number"
                    id="weekdays-rate"
                    min="0"
                    ref={weekdaysRateInput}
                    defaultValue={defaultWeekdaysRate}
                    required
                />
            </p>
            <p>
                <label htmlFor="weekend-rate">Weekend hourly rate (USD)</label>
                <input
                    type="number"
                    id="weekend-rate"
                    min="0"
                    ref={weekendRateInput}
                    defaultValue={defultWeekendRate}
                    required
                />
            </p>
            <p>
                <label htmlFor="discount">Discount percentage</label>
                <input
                    type="number"
                    id="discount"
                    min="0"
                    max="100"
                    ref={discountInput}
                    defaultValue={defultdiscount}
                    required
                />
            </p>
            {actions}
        </form>
    )
}

export default AreaForm
