// import { useEffect, useState } from 'react';
// import { type Task } from '~/utils/types';

// const isServer = typeof window === 'undefined';
// type SetValueFunction<T> = (value: T | ((prevValue: T) => T)) => void;

// export default function useLocalStorage(key:string, initialValue:Task[]) {
//   const [storedValue, setStoredValue] = useState<Task[]>(initialValue);

//   const initialize = () => {
//     if (isServer) {
//       return initialValue;
//     }
//     try {
//         // Get from local storage by key
//         const item = window.localStorage.getItem(key);
//         // Parse stored JSON or if none return initialValue
//         return item ? JSON.parse(item) as Task[] : initialValue;
//     } catch (error) {
//       // If error also return initialValue
//       console.log(error);
//       return initialValue;
//     }
//   };

//   /* prevents hydration error so that state is only initialized after server is defined */
//   useEffect(() => {
//     if (!isServer) {
//       setStoredValue(initialize());
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Return a wrapped version of useState's setter function that ...
//   // ... persists the new value to localStorage.
//   const setValue = (value:()=>Task[]) => {
//     try {
//       // Allow value to be a function so we have same API as useState
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       // Save state
//       setStoredValue(valueToStore);
//       // Save to local storage
//       if (typeof window !== 'undefined') {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       // A more advanced implementation would handle the error case
//       console.log(error);
//     }
//   };
//   return [storedValue, setValue];
// }
