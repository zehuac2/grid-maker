import { useState, useEffect, useCallback } from 'react';
export * from './usePrevious';

export function useMediaChangeListener(
  query: string,
  callback: (queryList: MediaQueryList) => void
): void {
  useEffect(() => {
    const queryList = matchMedia(query);

    queryList.onchange = () => {
      callback(queryList);
      console.log('on print');
    };

    return () => {
      queryList.onchange = null;
    };
  }, [callback]);
}

export function useMatchMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const queryList = matchMedia(query);

    setMatches(queryList.matches);

    queryList.onchange = () => {
      setMatches(queryList.matches);
    };

    return () => {
      queryList.onchange = null;
    };
  }, []);

  return matches;
}

export function useWindowInnerSize(): { width: number; height: number } {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const onResize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    console.log('onResize');
  }, []);

  useMediaChangeListener('print', onResize);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return {
    width,
    height,
  };
}
