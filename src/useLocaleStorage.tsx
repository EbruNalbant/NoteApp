import { useEffect, useState } from "react";

export function useLocaleStorage<T>(key: string, initialValue: T) {
  // define state
  const [value, setValue] = useState<T>(() => {
    // get values from local
    const jsonValue = localStorage.getItem(key);

    if (jsonValue === null) {
      return initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  // update local every time state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // return the state and modify method to use the hook
  return [value, setValue] as [T, typeof setValue];
}
