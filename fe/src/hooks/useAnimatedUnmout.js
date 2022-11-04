import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(view) {
  const [shouldRender, setShouldRender] = useState(view);
  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (view) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const elementRef = animatedElementRef.current;
    if (!view && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [view]);

  return {
    shouldRender,
    animatedElementRef,
  };
}
