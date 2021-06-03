import { Names, Products, ElementList } from '../../interfaces/intex'

export const calculatePrice = (price: number, currency: number): number => Math.round(price * currency)

export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const prepareList = (names: Names, products: Products) => {
    const prepareGoods: ElementList[] = []

    products?.Value?.Goods.forEach((good) => {
        const object: ElementList = {}
        const name = names?.[good.G]

        const copyGoods = name.B

        copyGoods[good.T].price = good.C
        copyGoods[good.T].quantity = good.P

        object.title = name.G
        object.id = good.G
        object.goods = Object.values(copyGoods)

        object.goods.forEach((g, index) => {
            g.id = Number(Object.entries(copyGoods)[index][0])
        });

        if (!prepareGoods.find((el) => el.id === object.id)) {
            prepareGoods.push(object)
        }
    })

    return prepareGoods
}
