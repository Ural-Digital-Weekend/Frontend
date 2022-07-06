import {useState, useEffect} from 'react'

export function useDebounce(value: any, delay: number = 200) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay)

      return () => clearTimeout(handler)
    }, [value]
  )

  return debouncedValue
}