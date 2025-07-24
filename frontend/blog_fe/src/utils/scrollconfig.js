import { useRef } from "react";

export function usePreserveScroll() {
  const scrollRef = useRef(0);

  const saveScroll = () => {
    scrollRef.current = window.scrollY;
  };

  const restoreScroll = () => {
    setTimeout(() => {
      window.scrollTo(0, scrollRef.current);
    }, 0);
  };

  return { saveScroll, restoreScroll };
}