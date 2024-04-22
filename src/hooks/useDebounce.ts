import React from "react";

function useDebounce(value: string, duration: number) {
  const [debounceValue, setDebounceValue] = React.useState(value);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, duration);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return debounceValue;
}
export default useDebounce;
