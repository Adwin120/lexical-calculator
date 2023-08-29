import { useRef } from "react";

export function useCreate<T>(create: () => T): T {
    const ref = useRef<T>();
    if (!ref.current) {
        ref.current = create();
    }
    return ref.current;
}