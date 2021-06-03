import type { NextApiRequest, NextApiResponse } from 'next'
import { Products } from '../../interfaces/intex'
import products from '../../public/products.json'

export default (req: NextApiRequest, res: NextApiResponse<Products>) => {
    res.status(200).send(products)
}
