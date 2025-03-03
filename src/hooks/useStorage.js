import { useState } from "react";

export function useStorage(key, defaultValue, ttl) {
    const now = new Date().getTime();
    const storedItem = JSON.parse(localStorage.getItem(key));

    const [value, setValue] = useState(
        storedItem && storedItem.expiry > now ? storedItem.value : defaultValue
    );

    const setItem = (newValue, newTtl) => {
        const expiry = new Date().getTime() + (newTtl || ttl);
        localStorage.setItem(key, JSON.stringify({ value: newValue, expiry }));
        setValue(newValue);
    };

    return [value, setItem];
}
