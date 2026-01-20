"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaClock } from "react-icons/fa";
import VintageSign from "./VintageSign";

// Sizzle/frying animation
const sizzle = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px var(--amber-glow), 0 0 10px var(--crispy-gold);
  }
  50% { 
    box-shadow: 0 0 15px var(--amber-glow), 0 0 25px var(--sizzle-orange);
  }
`;

// Oil drip animation
const oilDrip = keyframes`
  0% { transform: translateY(-5px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(15px); opacity: 0; }
`;

// Gentle bubble animation
const bubbleUp = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-3px) scale(1.05); }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: var(--z-content);
`;



// Fryer basket container with wire mesh pattern
const FryerBasket = styled.div`
  background: 
    /* Wire mesh pattern */
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 8px,
      var(--basket-wire) 8px,
      var(--basket-wire) 10px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 8px,
      var(--basket-wire) 8px,
      var(--basket-wire) 10px
    ),
    linear-gradient(135deg, 
      var(--basket-handle) 0%, 
      var(--basket-wire-dark) 50%,
      var(--basket-handle) 100%
    );
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.5),
    inset 0 0 30px rgba(0, 0, 0, 0.3),
    0 0 20px var(--amber-glow);
  border: 6px solid var(--basket-wire-light);
  width: 100%;
  max-width: 1000px;
  position: relative;
  
  /* Basket rim effect */
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 10%;
    right: 10%;
    height: 12px;
    background: linear-gradient(
      to bottom,
      var(--basket-wire-light),
      var(--basket-wire-dark)
    );
    border-radius: 10px 10px 0 0;
  }
  
  /* Basket handles */
  &::after {
    content: '';
    position: absolute;
    top: -45px;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 50px;
    border: 8px solid var(--basket-handle);
    border-bottom: none;
    border-radius: 70px 70px 0 0;
    background: transparent;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-top: 1rem;
`;

const ProgressContainer = styled.div`
  margin: 1rem auto 2rem;
  max-width: 85%;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 35px;
  background: var(--basket-wire-dark);
  border-radius: 20px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  border: 3px solid var(--basket-wire-light);
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(90deg, 
    var(--crispy-brown), 
    var(--crispy-gold), 
    var(--amber-glow)
  );
  transition: width 0.5s ease-out;
  position: relative;
  border-radius: 15px;
  animation: ${sizzle} 2s ease-in-out infinite;
  
  /* Crispy bubble effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 15% 50%, rgba(255,200,100,0.6) 2px, transparent 3px),
      radial-gradient(circle at 50% 30%, rgba(255,180,80,0.5) 3px, transparent 4px),
      radial-gradient(circle at 85% 60%, rgba(255,220,120,0.6) 2px, transparent 3px);
    animation: ${bubbleUp} 1.5s ease-in-out infinite;
  }
`;

const ProgressLabel = styled.div`
  font-family: var(--font-display);
  color: var(--crispy-gold);
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 5px var(--amber-glow);
  
  svg {
    color: var(--sizzle-orange);
    margin-right: 0.5rem;
    filter: drop-shadow(0 0 3px var(--sizzle-orange));
  }
`;

const DaysLeft = styled.div`
  text-align: right;
  font-size: 0.95rem;
  color: var(--sesame-light);
  margin-top: 8px;
  font-family: var(--font-display);
  letter-spacing: 1px;
`;

const CalendarWrapper = styled.div`
  background: var(--breading-tan);
  border: 4px solid var(--basket-wire);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  padding-bottom: 75%;
  height: 0;
  box-shadow: 
    inset 0 0 20px rgba(139, 69, 19, 0.3),
    0 5px 15px rgba(0, 0, 0, 0.3);

  /* Oil droplets on sides */
  &::before, &::after {
    content: '💧';
    position: absolute;
    font-size: 12px;
    opacity: 0.6;
    animation: ${oilDrip} 2s ease-in-out infinite;
    z-index: 2;
  }
  &::before { left: 5px; top: 10%; animation-delay: 0s; }
  &::after { right: 5px; top: 20%; animation-delay: 1s; }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CourseCalendar = () => {
  const [semesterProgress, setSemesterProgress] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const startDate = new Date("2026-01-21"); 
      const endDate = new Date("2026-05-15");
      const currentDate = new Date();

      const totalSemesterDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
      );
      const daysElapsed = Math.ceil(
        (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const daysRemaining = Math.max(0, totalSemesterDays - daysElapsed);

      let progress = 0;
      if (currentDate >= startDate && currentDate <= endDate) {
        progress = Math.min(
          100,
          Math.max(0, (daysElapsed / totalSemesterDays) * 100)
        );
      } else if (currentDate > endDate) {
        progress = 100;
      }

      setSemesterProgress(progress);
      setDaysLeft(daysRemaining);
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 1000 * 60 * 60); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="calendar">
      <VintageSign text="🍟 Fry Schedule" color="var(--crispy-gold)" rotate="-1deg" />
      
      <FryerBasket>
        <Header>
          <ProgressContainer>
            <ProgressLabel>
              <span><FaClock /> Cooking Status</span>
              <span>{Math.round(semesterProgress)}% Golden</span>
            </ProgressLabel>
            <ProgressBar>
              <ProgressFill $progress={semesterProgress} />
            </ProgressBar>
            <DaysLeft>
               {daysLeft > 0 ? `🔥 ${daysLeft} days until perfectly crispy` : "✨ Golden brown!"}
            </DaysLeft>
          </ProgressContainer>
        </Header>
        
        <CalendarWrapper>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=c_1e563359e8c9116d2d5a5a922e74fc0d286c731f5264d6fb6d674a1b355e1eff%40group.calendar.google.com&ctz=America%2FNew_York"
            frameBorder="0"
            scrolling="no"
            title="Course Calendar"
          ></iframe>
        </CalendarWrapper>
      </FryerBasket>
    </Section>
  );
};

export default CourseCalendar;
