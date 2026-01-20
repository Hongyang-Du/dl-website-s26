'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook that plays a short sizzle sound effect when any clickable element is clicked.
 * The sound plays for 2-3 seconds (configurable) and respects the user's mute preference.
 */
const useClickSizzle = (duration: number = 2500) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/audio/sizzle.mp3');
      audioRef.current.volume = 0.25; // Slightly lower than the ambient sizzle
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Check if an element or its ancestors are clickable
  const isClickableElement = useCallback((element: HTMLElement): boolean => {
    const clickableTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL'];
    const clickableRoles = ['button', 'link', 'menuitem', 'tab', 'checkbox', 'radio', 'switch'];
    
    let current: HTMLElement | null = element;
    
    while (current && current !== document.body) {
      // Check tag name
      if (clickableTags.includes(current.tagName)) {
        return true;
      }
      
      // Check role attribute
      const role = current.getAttribute('role');
      if (role && clickableRoles.includes(role)) {
        return true;
      }
      
      // Check for onClick handler or cursor style
      const style = window.getComputedStyle(current);
      if (style.cursor === 'pointer') {
        return true;
      }
      
      // Check for tabindex (interactive elements)
      if (current.hasAttribute('tabindex') && current.getAttribute('tabindex') !== '-1') {
        return true;
      }
      
      current = current.parentElement;
    }
    
    return false;
  }, []);

  // Play sizzle effect
  const playSizzle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if user has muted sounds (from localStorage)
    const isMuted = localStorage.getItem('sizzleMuted') === 'true';
    if (isMuted) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset and play
    audio.currentTime = 0;
    audio.play().catch(err => {
      // Silently handle autoplay restrictions
      console.log('Click sizzle autoplay prevented:', err);
    });

    // Stop after duration
    timeoutRef.current = setTimeout(() => {
      if (audio) {
        // Fade out effect
        const fadeOut = () => {
          if (audio.volume > 0.05) {
            audio.volume -= 0.05;
            requestAnimationFrame(fadeOut);
          } else {
            audio.pause();
            audio.volume = 0.25; // Reset volume for next play
          }
        };
        fadeOut();
      }
    }, duration);
  }, [duration]);

  // Set up global click listener
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && isClickableElement(target)) {
        playSizzle();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [isClickableElement, playSizzle]);
};

export default useClickSizzle;
