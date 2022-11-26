import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
  const nodeRef = useRef();

  useEffect(() => {
    const mousedownHandler = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", mousedownHandler);

    return () => {
      document.removeEventListener("mousedown", mousedownHandler);
    };
  }, [handler]);

  return nodeRef;
};

export default useClickOutside;
