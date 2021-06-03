import { useCallback, useState, useEffect } from 'react'
import classnames from 'classnames'

import { usePrevious } from '../../src/hooks'
import { calculatePrice } from '../../src/utils'
import { Button } from './Buton'
import { ElementList, Good } from '../../interfaces/intex'

import style from '../../styles/List.module.scss'

interface Props {
    list: ElementList[]
    currency: number
    handleClick: any
}

export const List = ({ list, currency, handleClick }: Props) => {
    const [openTabs, setOpenStatus] = useState<any>({})
    const [price, setPriceStatus] = useState<string>('default')

    const prevProps = usePrevious({ currency });

    useEffect(() => {
        const prevCurrency: any = prevProps?.currency

        if (prevCurrency > currency) {
            setPriceStatus('falls')
        } else if (prevCurrency < currency) {
            setPriceStatus('grow')
        }else if ((prevCurrency === currency) || !prevCurrency) {
            setPriceStatus('default')
        }

    }, [currency])

    const handleClickTabs = (id: number): void => {
        setOpenStatus({
            ...openTabs,
            [id]: !openTabs[id]
        })
    }

    const renderGoods = (goods: Good[]) : any => {
        return goods?.map((good: Good): any => {
            return (
                <div key={good.id} className={classnames(style.good, style[price], !good.quantity && style.unavailable)}>
                    <div>{good.N}</div>
                    <div>{good.quantity ? `${calculatePrice(good.price as number, currency)} руб. / шт.` : ' - '}</div>
                    <div>{good.quantity || ' - '}</div>
                    <div>{good.quantity
                        ? <Button good={good} handleClick={handleClick} />
                        : ' - '}
                    </div>
                </div>
            )
        })
    }

    const renderList = (productList: ElementList[]): any => {
        return productList?.map((product: ElementList): any => {
            return (
                <div
                    key={product.id}
                    className={classnames(style.category, openTabs[product.id as number] && style.close)}
                >
                    <div
                        className={style.title}
                        onClick={useCallback(() => handleClickTabs(product.id as number), [openTabs])}
                    >
                        {product.title}
                    </div>
                    <div className={style.goods}>
                        <div className={style.header}>
                            <div>{'Название товара'}</div>
                            <div>{'Цена'}</div>
                            <div>{'Количество'}</div>
                            <div>{'Добавить в корзину'}</div>
                        </div>
                        {renderGoods(product.goods as Good[])}
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            { renderList(list) }
        </div>
    )
}
