
import { useEffect, useRef } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
  animation?: string;
  delay?: number;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = "0px",
  animation = "animate-fade-in",
  delay = 0
}: UseScrollAnimationProps = {}) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.classList.add(...animation.split(' '));
              ref.current.style.opacity = '1';
            }
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    
    if (currentRef) {
      currentRef.style.opacity = '0';
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animation, delay, rootMargin, threshold]);

  return ref;
};
