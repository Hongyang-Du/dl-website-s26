'use client';

import useClickSizzle from '../hooks/useClickSizzle';

/**
 * Provider component that enables the click sizzle effect globally.
 * Add this to your layout to make all clickable elements play a short sizzle sound.
 */
const ClickSizzleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the click sizzle hook with a 2.5 second duration
  useClickSizzle(1500);
  
  return <>{children}</>;
};

export default ClickSizzleProvider;
