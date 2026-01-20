"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const neonPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: var(--z-background);
  overflow: hidden;
  pointer-events: none;
`;

// Checkered floor pattern
const CheckeredFloor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(45deg, var(--tile-dark) 25%, transparent 25%), 
    linear-gradient(-45deg, var(--tile-dark) 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, var(--tile-dark) 75%), 
    linear-gradient(-45deg, transparent 75%, var(--tile-dark) 75%);
  background-size: 60px 60px;
  background-position: 0 0, 0 60px, 60px -60px, -60px 0px;
  background-color: var(--tile-light);
  
  @media (max-width: 768px) {
    background-size: 40px 40px;
    background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
  }
`;

// Gradient overlay for depth
const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(26, 26, 26, 0.3) 70%,
    rgba(26, 26, 26, 0.6) 100%
  );
`;

// Neon glow effect overlay
const NeonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(64, 224, 208, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(255, 105, 180, 0.05) 0%, transparent 60%);
  animation: ${neonPulse} 4s ease-in-out infinite;
  will-change: opacity;
`;

// Chrome shine effect at top
const ChromeStrip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(
    to bottom,
    rgba(192, 192, 192, 0.8) 0%,
    rgba(232, 232, 232, 0.6) 30%,
    rgba(192, 192, 192, 0.4) 70%,
    transparent 100%
  );
  z-index: 1;
`;

interface SparkleProps {
  left: number;
  top: number;
  size: number;
  delay: number;
}

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const Sparkle = styled.div.attrs<SparkleProps>(props => ({
  style: {
    left: `${props.left}%`,
    top: `${props.top}%`,
    width: `${props.size}px`,
    height: `${props.size}px`,
    animationDelay: `${props.delay}s`,
  }
}))<SparkleProps>`
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${sparkle} 3s ease-in-out infinite;
  z-index: 2;
  will-change: transform, opacity;
`;

const DinerBackground = () => {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);

  useEffect(() => {
    // Generate sparkle positions
    const newSparkles = Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 4, // 4-10px
      delay: Math.random() * 3,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <Container>
      <CheckeredFloor />
      <GradientOverlay />
      <NeonOverlay />
      <ChromeStrip />
      {sparkles.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}
    </Container>
  );
};

export default DinerBackground;
