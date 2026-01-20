"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { projectSummary, timeline, importantLinks } from "../data/finalProjectData";
import { FaCalendarAlt, FaStar, FaUtensils, FaLink, FaClock } from "react-icons/fa";
import { session1Groups, session2Groups } from "../data/dlDaySessionData";
import SessionModal from "./SessionModal";

const Section = styled.section`
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: var(--z-content);
`;

const Title = styled.h2`
  font-family: var(--font-retro);
  font-size: 3.5rem;
  color: var(--mint-green);
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 
    0 0 10px var(--mint-green),
    0 0 20px var(--mint-green),
    3px 3px 0 var(--diner-black);
  transform: rotate(1deg);
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 1100px;
  background: var(--diner-black);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 
    0 10px 40px rgba(0,0,0,0.4),
    inset 0 0 30px rgba(0, 0, 0, 0.3);
  border: 4px solid var(--chrome-silver);
`;

const HeroSummary = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.2), rgba(255, 105, 180, 0.1));
  padding: 2rem;
  border-radius: 15px;
  border: 2px solid var(--chrome-silver);
`;

const HeroTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: var(--neon-pink);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px var(--neon-pink);
`;

const HeroText = styled.p`
  color: var(--cream);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const EventDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const EventCard = styled.div`
  background: var(--tile-dark);
  padding: 1.2rem;
  border-radius: 10px;
  text-align: center;
  border: 2px solid var(--chrome-silver);
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--mint-green);
    box-shadow: 0 0 10px var(--mint-green);
  }
  
  h4 {
    font-family: var(--font-display);
    color: var(--mint-green);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  p {
    color: var(--cream);
  }
`;

const SectionTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.8rem;
  text-align: center;
  color: var(--cherry-red);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 5px var(--cherry-red);
  margin: 2rem 0;
`;

const TimelineContainer = styled.div`
  position: relative;
  margin: 3rem 0;
  padding-left: 2rem;
  border-left: 3px dashed var(--chrome-silver);
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 2rem;
  
  &::before {
    content: '☕';
    position: absolute;
    left: -2.2rem;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--diner-black);
    border: 2px solid var(--chrome-silver);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    z-index: 2;
  }
`;

const TimelineCard = styled.div`
  background: var(--tile-dark);
  padding: 1.5rem;
  border-radius: 10px;
  border: 2px solid var(--chrome-silver);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 15px;
    width: 0; 
    height: 0; 
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent; 
    border-right: 10px solid var(--chrome-silver); 
  }
`;

const DateBadge = styled.span`
  background: var(--cherry-red);
  color: var(--cream);
  padding: 0.3rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0.5rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ItemTitle = styled.h4`
  font-size: 1.2rem;
  font-family: var(--font-display);
  color: var(--mint-green);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const ItemDescription = styled.p`
  color: var(--cream);
  line-height: 1.5;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 10px;
  color: var(--neon-pink);
  text-decoration: none;
  font-weight: bold;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s;
  
  &:hover { 
    color: var(--cherry-red);
    text-shadow: 0 0 5px var(--cherry-red);
  }
`;

const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const SessionBtn = styled.button`
  background: linear-gradient(135deg, var(--cherry-red), var(--neon-pink));
  border: 3px solid var(--chrome-silver);
  padding: 2rem;
  border-radius: 15px;
  cursor: pointer;
  color: var(--cream);
  transition: all 0.2s;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 10px 20px rgba(0,0,0,0.3),
      0 0 20px var(--neon-pink);
  }
  
  h4 { 
    font-family: var(--font-display); 
    font-size: 1.8rem; 
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  p { 
    font-size: 1.2rem; 
    margin-bottom: 1rem; 
  }
  span { 
    font-size: 0.9rem; 
    background: rgba(0,0,0,0.3); 
    padding: 5px 15px; 
    border-radius: 20px;
    font-family: var(--font-display);
  }
`;

const FinalProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSession, setActiveSession] = useState<1 | 2 | null>(null);

  const openModal = (sessionNumber: 1 | 2) => {
    setActiveSession(sessionNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveSession(null);
  };

  return (
    <Section id="final-project">
      <Title>Chef's Special</Title>
      
      <MainContent>
        <HeroSummary>
          <HeroTitle><FaStar style={{color: 'var(--neon-pink)'}}/> {projectSummary.title} <FaStar style={{color: 'var(--neon-pink)'}}/></HeroTitle>
          <HeroText>{projectSummary.shortDescription}</HeroText>
          
          <EventDetails>
            <EventCard>
               <h4><FaCalendarAlt /> Date</h4>
               <p>December 11, 2025</p>
            </EventCard>
            <EventCard>
               <h4><FaClock /> Time</h4>
               <p>9:15 AM - 12:15 PM</p>
            </EventCard>
            <EventCard>
               <h4><FaUtensils /> Venue</h4>
               <p>CIT 3rd Floor Atrium</p>
            </EventCard>
          </EventDetails>
        </HeroSummary>

        <SectionTitle>
          Recipe Steps (Timeline)
        </SectionTitle>

        <TimelineContainer>
          {timeline.map((item) => (
            <TimelineItem key={item.id}>
              <TimelineCard>
                <DateBadge>{item.date}</DateBadge>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
                {item.links?.map((link, i) => (
                  <LinkButton key={i} href={link.url} target="_blank">
                    <FaLink /> {link.label}
                  </LinkButton>
                ))}
              </TimelineCard>
            </TimelineItem>
          ))}
        </TimelineContainer>

        <SectionTitle>
          Tasting Sessions
        </SectionTitle>
        
        <SessionsGrid>
           <SessionBtn onClick={() => openModal(1)}>
              <h4>First Seating</h4>
              <p>Session 1</p>
              <span>9:15 AM - 10:45 AM</span>
           </SessionBtn>
           <SessionBtn onClick={() => openModal(2)}>
              <h4>Second Seating</h4>
              <p>Session 2</p>
              <span>11:00 AM - 12:15 PM</span>
           </SessionBtn>
        </SessionsGrid>
      </MainContent>

      <SessionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        sessionTitle={activeSession === 1 ? "Session 1 Seating" : "Session 2 Seating"}
        sessionTime={activeSession === 1 ? "9:15 AM - 10:45 AM" : "11:00 AM - 12:15 PM"}
        groups={activeSession === 1 ? session1Groups : session2Groups}
      />
    </Section>
  );
};

export default FinalProject;
