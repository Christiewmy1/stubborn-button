import { useCallback, useState } from "react";
import { DODGE_THROTTLE_MS } from "../lib/constants";

export function useSassMessage(messages: string[]) {
  const [message, setMessage] = useState<string | null>(null);
  const [lastIndex, setLastIndex] = useState(-1);

  const showRandom = useCallback(() => {
    if (messages.length === 0) return;

    let nextIndex = Math.floor(Math.random() * messages.length);
    if (messages.length > 1) {
      while (nextIndex === lastIndex) {
        nextIndex = Math.floor(Math.random() * messages.length);
      }
    }

    setLastIndex(nextIndex);
    setMessage(messages[nextIndex]);
  }, [messages, lastIndex]);

  const clear = useCallback(() => setMessage(null), []);

  return { message, showRandom, clear };
}

export function useDodgeThrottle() {
  const [lastDodge, setLastDodge] = useState(0);

  const canDodge = useCallback(() => {
    const now = Date.now();
    if (now - lastDodge < DODGE_THROTTLE_MS) return false;
    setLastDodge(now);
    return true;
  }, [lastDodge]);

  return canDodge;
}
