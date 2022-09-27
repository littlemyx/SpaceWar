import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'

const Debug = ({ children }) => {
  const domNode = useRef(null)

  useEffect(() => {
    const node = document && document.getElementById('debug-ui')
    domNode.current = node
  }, [])

  return domNode.current ? createPortal(children, domNode.current) : null
}

export default Debug
