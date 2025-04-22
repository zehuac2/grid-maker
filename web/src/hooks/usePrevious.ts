import { useRef } from 'react';

/**
 * If condition is true, return the previous value.
 */
export default function usePrevious<T>(value: T, condition: boolean): T {
  const valueRef = useRef(value);

  if (condition) {
    return valueRef.current;
  }

  valueRef.current = value;
  return value;
}
