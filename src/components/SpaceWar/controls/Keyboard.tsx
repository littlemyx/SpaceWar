import { useEffect } from 'react'
import { keys } from '../helpers/keys'
import { useStore } from '../store/store'

const Keyboard = () => {
  const [inputMap, actions] = useStore(({ inputMap, actions }) => [
    inputMap,
    actions,
  ])

  type keyMapType = typeof inputMap

  useEffect(() => {
    const keyMap: Partial<Record<string, keyof keyMapType>> = keys(
      inputMap,
    ).reduce(
      (out, actionName) => ({
        ...out,
        ...inputMap[actionName].reduce(
          (inputs, input) => ({ ...inputs, [input]: actionName }),
          {},
        ),
      }),
      {},
    )

    const KeyDownHandler = ({ key, target }: KeyboardEvent) => {
      const actionName = keyMap[key.toLowerCase()]
      if (!actionName || (target as HTMLInputElement).nodeName === 'INPUT') {
        return
      }
      actions[actionName](1)
    }

    const KeyUpHandler = ({ key, target }: KeyboardEvent) => {
      const actionName = keyMap[key.toLowerCase()]
      if (!actionName || (target as HTMLInputElement).nodeName === 'INPUT') {
        return
      }
      actions[actionName](0)
    }

    window.addEventListener('keydown', KeyDownHandler, { passive: true })
    window.addEventListener('keyup', KeyUpHandler, { passive: true })

    return () => {
      window.removeEventListener('keydown', KeyDownHandler)
      window.removeEventListener('keyup', KeyUpHandler)
    }
  }, [])

  return null
}

export default Keyboard
