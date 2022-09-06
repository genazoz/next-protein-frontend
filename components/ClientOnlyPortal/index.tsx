import React, {useRef, useEffect, useState, FC} from 'react'
import { createPortal } from 'react-dom'

interface ClientOnlyPortalProps {
  children: JSX.Element | null,
  selector: string
}

export const ClientOnlyPortal: FC<ClientOnlyPortalProps> = ({ selector, children }) => {
  const ref = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted && ref.current ? createPortal(children, ref.current) : children
}