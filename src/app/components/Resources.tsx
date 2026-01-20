"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { useAssetPath } from "../hooks/useAssetPath";
import VintageSign from "./VintageSign";

interface ResourceItem {
  title: string;
  link: string;
}

interface ResourceCategory {
  title: string;
  resources: ResourceItem[];
}

const resourceData: ResourceCategory[] = [
  {
    title: "Order Forms",
    resources: [
      {
        title: "Collaboration Form",
        link: "https://forms.gle/FjQ4yHcnJ7bkpMTa7",
      },
      {
        title: "Anonymous Feedback Form",
        link: "https://forms.gle/JgbBC4Fomtz4u6N67",
      },
    ],
  },
  {
    title: "Recipe Book",
    resources: [
      {
        title: "GitHub Guide",
        link: "https://hackmd.io/gGOpcqoeTx-BOvLXQWRgQg",
      },
      {
        title: "Opening Up Labs",
        link: "https://hackmd.io/@BrownDeepLearningS24/BkIT3sW6s",
      },
      {
        title: "Google Colaboratory Tutorial",
        link: "https://hackmd.io/@BrownDeepLearningS24/BkIT3sW6s",
      },
    ],
  },
  {
    title: "Delivery & Takeout",
    resources: [
      {
        title: "FastX Setup Guide",
        link: "https://cs.brown.edu/about/system/connecting/fastx/",
      },
      {
        title: "ssh Guide",
        link: "https://cs.brown.edu/about/system/connecting/ssh/",
      },
    ],
  },
  {
    title: "Kitchen Equipment",
    resources: [
      {
        title: "Capstone Information",
        link: "https://cs.brown.edu/degrees/undergrad/concentrating-in-cs/concentration-requirements-2020/capstone/",
      },
      {
        title: "Linux Cheat Sheet",
        link: "https://cheatography.com/davechild/cheat-sheets/linux-command-line/",
      },
      {
        title: "Setting Up Email",
        link: "http://cs.brown.edu/about/system/accounts/email/",
      },
      {
        title: "IT Services",
        link: "https://ithelp.brown.edu/",
      },
      {
        title: "IT Loaner Laptops",
        link: "https://ithelp.brown.edu/kb/articles/it-service-center-loaner-equipment-3",
      },
    ],
  },
  {
    title: "Food Safety & Health",
    resources: [
      {
        title: "CAPS",
        link: "https://www.brown.edu/campus-life/support/counseling-and-psychological-services/",
      },
      {
        title: "Women in Computer Science",
        link: "https://cs.brown.edu/people/orgs/wics/",
      },
      {
        title: "Mosaic+",
        link: "https://mosaicplus.github.io/",
      },
      {
        title: "Title IX",
        link: "https://www.brown.edu/about/administration/title-ix/",
      },
      {
        title: "Health and Wellness Advocates",
        link: "https://cs.brown.edu/about/diversity/health-wellness-student-advocates/",
      },
      {
        title: "Diversity and Inclusion",
        link: "https://cs.brown.edu/about/diversity/student-advocates-diversity-and-inclusion/",
      },
      {
        title: "CS DUG",
        link: "http://cs.brown.edu/people/orgs/dug/",
      },
    ],
  },
];

// Animations
const floatInOil = keyframes`
  0%, 100% { transform: translateY(0) rotate(2deg); }
  50% { transform: translateY(-6px) rotate(-1deg); }
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



const ShelvesContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

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
    /* Subtle metallic backing */
    linear-gradient(135deg, 
      rgba(60, 60, 60, 0.4) 0%, 
      rgba(30, 30, 30, 0.6) 100%
    );
  padding: 2.5rem 2rem;
  border-radius: 15px;
  position: relative;
  border: 4px solid var(--basket-wire-light);
  box-shadow: 
    0 10px 30px rgba(0,0,0,0.4),
    inset 0 0 20px rgba(0,0,0,0.5);
  
  /* Basket Rim */
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 2px solid var(--basket-wire-dark);
    border-radius: 18px;
    pointer-events: none;
  }
`;

const ShelfLabel = styled.h3`
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--sesame-light);
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 0 var(--diner-black);
  
  /* Metal Plate Look */
  background: var(--basket-handle);
  display: inline-block;
  padding: 0.5rem 2rem;
  border-radius: 4px;
  border: 2px solid var(--basket-wire-light);
  position: relative;
  left: 50%;
  transform: translateX(-50%) rotate(-1deg);
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
`;

const ItemsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  align-items: flex-end;
`;

const CondimentBottle = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 100px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${floatInOil} 5s ease-in-out infinite;
  animation-delay: ${() => Math.random() * 2}s;
  
  &:hover {
    transform: scale(1.15) rotate(5deg) !important;
    filter: brightness(1.2);
    z-index: 2;
  }
`;

const BottleImage = styled(Image)`
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  transition: filter 0.3s;
  
  ${CondimentBottle}:hover & {
    filter: drop-shadow(0 8px 15px rgba(0,0,0,0.5));
  }
`;

const LabelTag = styled.div`
  background: var(--cream);
  border: 2px solid var(--basket-wire-dark);
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  text-align: center;
  font-weight: bold;
  color: var(--diner-black);
  border-radius: 4px;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 120px;
  margin-top: 0.5rem;
  white-space: normal;
  line-height: 1.1;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  transform: rotate(-2deg);
  
  ${CondimentBottle}:hover & {
    background: var(--diner-white);
    transform: rotate(0deg);
  }
`;

const Resources = () => {
  const getAssetPath = useAssetPath();

  // Map resources to condiment types
  const getCondimentSrc = (index: number) => {
    const condiments = [
      "/condiments/ketchup.svg",
      "/condiments/mustard.svg", 
      "/condiments/mayo.svg",
      "/condiments/hot_sauce.svg",
      "/condiments/bbq.svg"
    ];
    return condiments[index % condiments.length];
  };

  return (
    <Section id="resources">
      <VintageSign text="The Pantry" color="var(--crispy-gold)" rotate="-2deg" />
      
      <ShelvesContainer>
        {resourceData.map((category, i) => (
          <FryerBasket key={i}>
            <ShelfLabel>{category.title}</ShelfLabel>
            <ItemsRow>
              {category.resources.map((res, j) => (
                <CondimentBottle key={j} href={res.link} target="_blank">
                  <BottleImage 
                    src={getAssetPath(getCondimentSrc(i + j))} 
                    alt={res.title}
                    width={50}
                    height={100}
                    style={{ width: 'auto', height: '100px', objectFit: 'contain' }}
                  />
                  <LabelTag>{res.title}</LabelTag>
                </CondimentBottle>
              ))}
            </ItemsRow>
          </FryerBasket>
        ))}
      </ShelvesContainer>
    </Section>
  );
};

export default Resources;
