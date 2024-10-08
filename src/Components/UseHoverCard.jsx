import { useCallback, useRef, useState } from "react";

const useHoverCard = (initialVisibility = false, timeoutDuration = 200) => {
  const [hoverCardVisible, setHoverCardVisible] = useState(initialVisibility);
  const [isMouseOverHoverCard, setIsMouseOverHoverCard] = useState(false);
  const timeoutId = useRef(null);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeoutId.current);
    setHoverCardVisible(true);
  }, []);

  const handleMouseEnterHoverCard = useCallback(() => {
    clearTimeout(timeoutId.current);
    setIsMouseOverHoverCard(true);
  }, []);

  const handleMouseLeaveHoverCard = useCallback(() => {
    setIsMouseOverHoverCard(false);
    timeoutId.current = setTimeout(() => {
      setHoverCardVisible(false);
    }, timeoutDuration); 
  }, [timeoutDuration]);

  const handleMouseLeave = useCallback(() => {
    timeoutId.current = setTimeout(() => {
      if (!isMouseOverHoverCard) {
        setHoverCardVisible(false);
      }
    }, timeoutDuration); 
  }, [isMouseOverHoverCard, timeoutDuration]);

  return {
    hoverCardVisible,
    handleMouseEnter,
    handleMouseEnterHoverCard,
    handleMouseLeaveHoverCard,
    handleMouseLeave,
  };
};

export default useHoverCard;
