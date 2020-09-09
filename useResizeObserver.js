// Adapted from https://github.com/ZeeCoder/use-resize-observer/blob/master/src/ResizeObserver.d.ts

import {
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

function useResizeObserver(opts = {}) {
  // `defaultRef` Has to be non-conditionally declared here whether or not it'll
  // be used as that's how hooks work.
  // @see https://reactjs.org/docs/hooks-rules.html#explanation
  const defaultRef = useRef(null);

  // Saving the callback as a ref. With this, I don't need to put onResize in the
  // effect dep array, and just passing in an anonymous function without memoising
  // will not reinstantiate the hook's ResizeObserver
  const onResize = opts.onResize;
  const onResizeRef = useRef(undefined);
  onResizeRef.current = onResize;

  // Using a single instance throughought the hook's lifetime
  const resizeObserverRef = useRef(null);

  const ref = opts.ref || defaultRef;
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  // Using a ref to track the previous width / height to avoid unnecessary renders
  const previous = useRef({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (resizeObserverRef.current) {
      return;
    }

    resizeObserverRef.current = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) {
        return;
      }

      // Since we only observe the one element, we don't need to loop over the
      // array
      if (!entries.length) {
        return;
      }

      const entry = entries[0];

      // `Math.round` is in line with how CSS resolves sub-pixel values
      const newWidth = Math.round(entry.contentRect.width);
      const newHeight = Math.round(entry.contentRect.height);
      if (
        previous.current.width !== newWidth ||
        previous.current.height !== newHeight
      ) {
        const newSize = { width: newWidth, height: newHeight };
        if (onResizeRef.current) {
          onResizeRef.current(newSize);
        } else {
          previous.current.width = newWidth;
          previous.current.height = newHeight;
          setSize(newSize);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (
      typeof ref !== 'object' ||
      ref === null ||
      !(ref.current instanceof Element)
    ) {
      return;
    }

    const element = ref.current;

    resizeObserverRef.current.observe(element);

    return () => resizeObserverRef.current.unobserve(element);
  }, [ref]);

  return useMemo(() => ({ ref, width: size.width, height: size.height }), [
    ref,
    size ? size.width : null,
    size ? size.height : null,
  ]);
}

export default useResizeObserver;
