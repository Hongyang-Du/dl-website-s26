"use client";

import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const GaugeWrapper = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 140px;
  height: 140px;
  z-index: 2000;
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5));
`;

const Bezel = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    from 180deg,
    #b0b0b0 0%,
    #ffffff 10%,
    #888888 45%,
    #555555 50%,
    #888888 55%,
    #ffffff 90%,
    #b0b0b0 100%
  );
  box-shadow: 
    inset 0 0 5px rgba(0,0,0,0.8),
    inset 2px 2px 5px rgba(255,255,255,0.6),
    0 5px 15px rgba(0,0,0,0.5);
  padding: 8px;
  position: relative;
  border: 1px solid var(--chrome-silver);
`;

const InnerFace = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, var(--cream), #dcdcdc);
  position: relative;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0,0,0,0.1);
`;

// Glass reflection effect
const Glass = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.1) 40%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  pointer-events: none;
  z-index: 10;
`;

const TickMarksSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(135deg);
`;

const NeedleContainer = styled.div<{ $rotation: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(${props => props.$rotation}deg);
  transition: transform 0.2s cubic-bezier(0.1, 1.2, 0.5, 1);
  z-index: 5;
`;

const Needle = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 4px;
  height: 48%;
  background: var(--cherry-red);
  transform-origin: bottom center;
  transform: translateX(-50%);
  border-radius: 50% 50% 0 0;
  box-shadow: 2px 2px 3px rgba(0,0,0,0.3);

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background: var(--chrome-silver);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }
`;

const Label = styled.div`
  position: absolute;
  bottom: 28%;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--diner-black);
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 2;
  opacity: 0.8;
`;

const ValueLabel = styled.div`
  position: absolute;
  top: 65%;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.8rem;
  color: var(--diner-black);
  z-index: 2;
  background: rgba(255,255,255,0.5);
  padding: 0 4px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.1);
`;

const TempGauge = () => {
  const [rotation, setRotation] = useState(-135);
  const [visible, setVisible] = useState(false);
  const [temperature, setTemperature] = useState(0);

  const handleScroll = useCallback(() => {
    const assignmentsSection = document.getElementById("assignments");
    if (!assignmentsSection) return;

    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    const assignmentsRect = assignmentsSection.getBoundingClientRect();
    const assignmentsTop = assignmentsRect.top;
    
    const triggerPoint = viewportHeight - 300;
    
    let progress = 0;
    
    if (assignmentsTop > triggerPoint) {
      setVisible(false);
      progress = 0;
    } else {
      setVisible(true);
      
      const elementAbsoluteTop = assignmentsTop + scrollTop;
      const startScrollY = elementAbsoluteTop - triggerPoint;
      const endScrollY = scrollHeight - viewportHeight;
      
      if (startScrollY >= endScrollY) {
          progress = 100;
      } else {
          const percentage = ((scrollTop - startScrollY) / (endScrollY - startScrollY)) * 100;
          progress = Math.min(Math.max(percentage, 0), 100);
      }
    }
    
    setTemperature(Math.round(progress));
    
    const deg = -135 + (progress / 100) * 270;
    setRotation(deg);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Generate tick marks
  const ticks = [];
  for (let i = 0; i <= 20; i++) {
    const angle = -135 + (i / 20) * 270;
    const isMajor = i % 5 === 0;
    const length = isMajor ? 14 : 7;
    const width = isMajor ? 3 : 1;
    // Vintage color logic: Blue (Cold) -> Black -> Red (Hot)
    const fill = i < 6 ? '#0066cc' : (i > 14 ? 'var(--cherry-red)' : 'var(--diner-black)');
    
    ticks.push(
      <rect
        key={i}
        x="50%"
        y="6"
        width={width}
        height={length}
        fill={fill}
        transform={`rotate(${angle}, 70, 70)`}
      />
    );
  }

  return (
    <GaugeWrapper $isVisible={visible}>
      <Bezel>
        <InnerFace>
            <Glass />
            <TickMarksSVG viewBox="0 0 140 140">
                {ticks}
            </TickMarksSVG>
            <NeedleContainer $rotation={rotation}>
                <Needle />
            </NeedleContainer>
            <Label>TEMP</Label>
            <ValueLabel>{temperature}°F</ValueLabel>
        </InnerFace>
      </Bezel>
    </GaugeWrapper>
  );
};

export default TempGauge;

