import { useRef } from 'react'

//hook
export const useMoveScroll = () => {
    const element = useRef()
    const onMoveToElement = () => {
        element.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return { element, onMoveToElement }
}
