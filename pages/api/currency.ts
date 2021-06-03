import type { NextApiRequest, NextApiResponse } from 'next'
import { getRandomInt } from '../../src/utils'

interface Data {
    USD: number
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).send({ USD: getRandomInt(50, 80) })
}
