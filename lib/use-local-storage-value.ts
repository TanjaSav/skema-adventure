"use client";

import { useSyncExternalStore } from "react";

export function useLocalStorageValue(key: string, fallbackValue: string) {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener(`local-storage:${key}`, callback);

      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(`local-storage:${key}`, callback);
      };
    },
    () => localStorage.getItem(key) || fallbackValue,
    () => fallbackValue
  );
}

export function setLocalStorageValue(key: string, value: string) {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event(`local-storage:${key}`));
}
