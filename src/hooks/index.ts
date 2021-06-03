import { useEffect, useRef } from 'react'

interface Prop {
    currency: number
}

export const usePrevious = (value: Prop) => {
    const ref = useRef<Prop>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
