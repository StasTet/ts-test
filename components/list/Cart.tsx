import { useMemo } from "react";
import { CartElement } from '../../interfaces/intex'

import {calculatePrice} from "../../src/utils";

import style from "../../styles/Cart.module.scss";

interface Props {
    cart: CartElement[]
    handleClick: any
    handleChange: any
    currency: number
}

export const Cart = ({ cart, handleClick, currency, handleChange }: Props) => {
    const sum: number = useMemo((): number => {
        let result = 0
        cart.forEach((el: CartElement): number => result = result + calculatePrice(el.price, currency) * el.orderQuantity)

        return result
    }, [cart])

    const renderGoods = (_cart: CartElement[]): any => {
        return _cart?.map((element: CartElement): any => {
            return (
                <div key={element.id} className={style.element}>
                    <div>{element.title}</div>
                    <div>{`${element.orderQuantity * calculatePrice(element.price, currency)} руб. / шт.`}</div>
                    <div>
                        <input
                            className={style.input}
                            type="number"
                            min="1"
                            max={element.allQuantity}
                            value={element.orderQuantity}
                            onChange={(event) => handleChange(event, element.id)}
                        />
                    </div>
                    <div>
                        <button
                            className={style.buton}
                            onClick={() => handleClick(element.id)}
                        >
                            {'Удалить из корзины'}
                        </button>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={style.cart}>
            <div className={style.title}>{'Корзина'}</div>
            <div className={style.header}>
                <div>{'Название товара'}</div>
                <div>{'Цена'}</div>
                <div>{'Количество'}</div>
                <div />
            </div>
            {renderGoods(cart)}
            <div className={style.total}>{`Всего к оплате: ${sum} руб.`}</div>
        </div>
    )
}
