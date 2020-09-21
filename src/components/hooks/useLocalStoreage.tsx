import React, { useState, useEffect, FC } from "react";

export const PRIFIX = "edit-lang-";

const useLocalStoreage = (key: string, initialValue: string | any) => {
  const prefixKey = PRIFIX + key;

  const [state, setState] = useState<any>(() => {
    const jsonValue = localStorage.getItem(prefixKey);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixKey, JSON.stringify(state));
  }, [prefixKey, state]);
  return [state, setState];
};

export default useLocalStoreage;
