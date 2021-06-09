import React, { useState, useEffect, useMemo, useCallback } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { GetStaticProps } from 'next'

import { List } from '../components/list/List'
import { Cart } from '../components/list/Cart'
import { prepareList} from '../src/utils'
import { API} from '../src/constants'
import { CartElement, Names, Products, Currency, ElementList } from '../interfaces/intex'

import style from '../styles/Index.module.scss'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

// TODO: handle errors
export const getStaticProps: GetStaticProps = async () => {
    const names = await fetch('http://localhost:3000/api/names')
    const products = await fetch('http://localhost:3000/api/products')
    const currency = await fetch('http://localhost:3000/api/currency')
    const namesJson = await names.json()
    const productsJson = await products.json()
    const currencyJson = await currency.json()

    return {
        props: {
            names: namesJson,
            products: productsJson,
            currency: currencyJson
        },
        revalidate: 20000
    }
}
 interface Props {
    names: Names
    products: Products
    currency: Currency
}

 const Index = (props: Props) => {
    const [cart, setCart] = useState<CartElement[]>([])

    //  useEffect(() => {
    //      setCart(JSON.parse(localStorage.getItem('cart') as string))

    //      return () => {
    //          localStorage.setItem('cart', JSON.stringify(cart));
    //      }
    //  }, [])

    //  useEffect(() => {
    //      localStorage.setItem('cart', JSON.stringify(cart));
    //  }, [cart])

    const { data: names } = useSWR(API.names, fetcher, {
        refreshInterval: 20000,
        initialData: props.names
    })
    const { data: products } = useSWR(API.products, fetcher, {
        refreshInterval: 20000,
        initialData: props.products
    })
    const { data: currency } = useSWR(API.currency, fetcher, {
        refreshInterval: 15000,
        initialData: props.currency
    })

    const list: ElementList[] = useMemo((): ElementList[] => prepareList(names, products), [names, products])


    // TODO: need refactoring
    const handleClickAddToCart = useCallback((good, quantity) => {
         const copyCart: CartElement[]  = cart.slice()
         const existElementIndex: number = copyCart.findIndex((element: CartElement) => element.id === good.id)

         if (existElementIndex >= 0) {
             const existElement: any = copyCart.find((element : CartElement) => element.id === good.id)

             existElement.orderQuantity = (existElement.orderQuantity + quantity) > good.quantity ? good.quantity : existElement.orderQuantity + quantity

             copyCart[existElementIndex] = existElement
         } else {
             const obj = {
                 id: good.id,
                 title: good.N,
                 price: good.price,
                 orderQuantity: quantity,
                 allQuantity: good.quantity
             }
             copyCart.push(obj)
         }

         setCart(copyCart)
     }, [cart])

    // TODO: need refactoring
     const handleClickDelete = useCallback((id: number) => {
         const copyCart: CartElement[] = cart.slice()
         const existElementIndex: number = copyCart.findIndex((element: CartElement) => element.id === id)

         copyCart.splice(existElementIndex, 1)

         setCart(copyCart)
     }, [cart])

     // TODO: need refactoring
     const handleChangeQuantity = useCallback((event: any, id: number) => {
         const copyCart: CartElement[] = cart.slice()
         const valInput = Number(event.target.value)

         const existElementIndex: number = copyCart.findIndex((element: CartElement) => element.id === id)
         const existElement: any = copyCart.find((element: CartElement) => element.id === id)

         if (valInput <= existElement.allQuantity) {
             existElement.orderQuantity = valInput

             copyCart[existElementIndex] = existElement

             setCart(copyCart)
         }

     }, [cart])

    return (
        <div className={style.container}>
            <List
                list={list}
                currency={currency?.USD}
                handleClick={handleClickAddToCart}
            />

            {
                cart.length !== 0 &&
                    <Cart
                        cart={cart}
                        currency={currency?.USD}
                        handleClick={handleClickDelete}
                        handleChange={handleChangeQuantity}
                    />
            }

        </div>
    )
}

export default Index
