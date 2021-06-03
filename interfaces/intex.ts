
interface Goods {
    Goods: Value[]
}

interface Value {
    B: boolean
    C: number
    CV: null
    G: number
    P: number
    Pl: null
    T: number
}

export interface Products {
    Error: string
    Id: number
    Success: boolean
    Value: Goods
}

export interface Currency {
    USD: number
}

export interface Good {
    N: string
    T: number
    id?: number
    price?: number
    quantity?: number
}

interface Name {
    G: string
    C?: number
    B: {
        [key: string]: Good
    }
}

export interface Names {
    [key: string]: Name
}

export interface CartElement {
    allQuantity: number
    id: number
    orderQuantity: number
    price: number
    title: string
}


export interface ElementList {
    id?: number
    title?: string
    goods?: Good[]
}
