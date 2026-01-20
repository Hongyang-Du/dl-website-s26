"use client";

import React from "react";
import styled from "styled-components";
import { assignments } from "../data/assignmentData";
import { FaCarrot, FaHamburger } from "react-icons/fa";
import VintageSign from "./VintageSign";

const Section = styled.section`
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: var(--z-content);
`;



const OrdersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const OrderTicket = styled.div`
  background: var(--cream);
  width: 320px;
  padding: 1.5rem;
  box-shadow: 
    0 4px 6px rgba(0,0,0,0.2),
    inset 0 0 0 3px var(--diner-black);
  position: relative;
  font-family: 'Courier New', monospace;
  transition: transform 0.2s;
  border-radius: 10px;
  
  /* Receipt-style perforated edges */
  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 12px;
    background-repeat: repeat-x;
    background-size: 24px 12px;
  }
  
  &::before {
    top: -6px;
    background-image: radial-gradient(circle, var(--cream) 6px, transparent 6px);
  }
  
  &::after {
    bottom: -6px;
    background-image: radial-gradient(circle, var(--cream) 6px, transparent 6px);
  }
  
  &:hover {
    transform: translateY(-5px) rotate(1deg);
    box-shadow: 
      0 10px 20px rgba(0,0,0,0.25),
      inset 0 0 0 3px var(--cherry-red);
  }
`;

const TicketHeader = styled.div`
  border-bottom: 2px dashed var(--diner-black);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const OrderNumber = styled.h3`
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--cherry-red);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Timestamp = styled.div`
  font-size: 0.8rem;
  color: var(--diner-black);
  display: flex;
  justify-content: space-between;
`;

const ItemSection = styled.div`
  margin-bottom: 1rem;
`;

const SectionLabel = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--diner-black);
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  svg {
    color: var(--cherry-red);
  }
`;

const ActionLink = styled.a`
  display: block;
  background: var(--diner-black);
  padding: 0.6rem;
  text-decoration: none;
  color: var(--cream);
  font-weight: bold;
  border: 2px solid var(--chrome-silver);
  text-align: center;
  transition: all 0.2s;
  border-radius: 5px;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: var(--cherry-red);
    border-color: var(--cherry-red);
    box-shadow: 0 0 10px var(--cherry-red);
  }
`;

const DisabledActionLink = styled.div`
  display: block;
  background: repeating-linear-gradient(
    45deg,
    var(--chrome-silver),
    var(--chrome-silver) 10px,
    #ccc 10px,
    #ccc 20px
  );
  padding: 0.6rem;
  text-decoration: none;
  color: var(--diner-black);
  font-weight: bold;
  border: 2px dashed var(--diner-black);
  text-align: center;
  border-radius: 5px;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: not-allowed;
  opacity: 0.7;
`;

const AssignmentName = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--diner-black);
  text-transform: uppercase;
`;

const DueDate = styled.div`
  font-size: 0.8rem;
  margin-top: 3px;
  color: var(--cherry-red);
  font-weight: bold;
`;



const ThankYou = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--chrome-silver);
  letter-spacing: 1px;
`;

const Assignments = () => {
  const sortedAssignments = [...assignments].sort((a, b) => a.id - b.id);

  return (
    <Section id="assignments">
      <VintageSign text="Orders Up!" color="var(--neon-pink)" rotate="2deg" />
      
      <OrdersContainer>
        {sortedAssignments.map((assignment) => {
          const hasConceptual = !!assignment.conceptual;
          const hasProgramming = !!assignment.programming;
          const conceptualLink = assignment.conceptual?.link;
          const programmingLink = assignment.programming?.link;

          return (
            <OrderTicket key={assignment.id}>
              <TicketHeader>
                <OrderNumber>Order #{assignment.id}</OrderNumber>
                <Timestamp>
                  <span>RCVD: {assignment.outDate}</span>
                </Timestamp>
              </TicketHeader>
              
              <AssignmentName>
                {assignment.name}
              </AssignmentName>

              {hasConceptual && (
                <ItemSection>
                  <SectionLabel><FaCarrot /> Prep Work</SectionLabel>
                  {conceptualLink ? (
                    <ActionLink href={conceptualLink} target="_blank">
                      {assignment.conceptual?.title}
                    </ActionLink>
                  ) : (
                    <DisabledActionLink>
                      {assignment.conceptual?.title || "Pending..."}
                    </DisabledActionLink>
                  )}
                  <DueDate>
                    Due: {assignment.conceptual?.inDate}
                  </DueDate>
                </ItemSection>
              )}

              {hasProgramming && (
                <ItemSection>
                  <SectionLabel><FaHamburger /> Main Course</SectionLabel>
                  {programmingLink ? (
                    <ActionLink href={programmingLink} target="_blank">
                      {assignment.programming?.title}
                    </ActionLink>
                  ) : (
                    <DisabledActionLink>
                      {assignment.programming?.title || "Pending..."}
                    </DisabledActionLink>
                  )}
                  <DueDate>
                    Due: {assignment.programming?.inDate}
                  </DueDate>
                </ItemSection>
              )}

              <ThankYou>
                ★★★ THANK YOU ★★★
              </ThankYou>
            </OrderTicket>
          );
        })}
      </OrdersContainer>
    </Section>
  );
};

export default Assignments;
