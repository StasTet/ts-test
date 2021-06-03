import {useState, Fragment, useCallback} from "react";
import classnames from 'classnames'
import { Good } from '../../interfaces/intex'

import style from '../../styles/Buton.module.scss'

interface Props {
    good: Good,
    handleClick: any
}

export const Button = ({ good, handleClick }: Props) => {
    const [isError, setError] = useState<boolean>(false)
    const [value, setValue] = useState<number>(1)

    const handleChange =  useCallback((event: any): void => {
        const valInput: number = Number(event.target.value)

        if (valInput > (good.quantity as number)) {
            setError(true)
            setValue(valInput)
        } else {
            setError(false)
            setValue(valInput)
        }
    }, [isError, value])

    return (
        <Fragment>
            <input
                className={classnames(style.input, isError && style.error)}
                type="number"
                min="0"
                max={good.quantity}
                value={value}
                onChange={handleChange}
            />
            <button
                disabled={isError}
                onClick={() => handleClick(good, value)}>
                {'Добавить в корзину'}
            </button>
        </Fragment>
        )

}
