import { useRef, useEffect } from "react";

// From Dan Abramov's blog: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
