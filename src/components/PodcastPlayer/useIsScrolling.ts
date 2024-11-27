import { useCallback, useRef, useState } from "react"

function useIsScrolling(timeout = 3000) {
  const [isScrolling, setIsScrolling] = useState(false)
  const timer = useRef<null | number>(null)

  const doScrolling = useCallback(
    function doScrolling() {
      setIsScrolling(true)

      if (timer.current) {
        window.clearTimeout(timer.current)
      }

      timer.current = window.setTimeout(() => {
        setIsScrolling(false)
      }, timeout)
    },
    [timeout],
  )

  return { doScrolling, isScrolling, setIsScrolling }
}

export default useIsScrolling
