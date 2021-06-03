import type { NextApiRequest, NextApiResponse } from 'next'
import names from '../../public/names.json'

interface Data {
    [key: string]: {
        G: string
        C?: number
        B: {
            [key: string]: {
                N: string
                T: number | string
            }
        }

    }
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).send(names)
}
