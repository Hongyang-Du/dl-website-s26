// data/finalProjectData.ts

export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  links?: {
    label: string;
    url: string;
  }[];
}

export interface ResourceLink {
  label: string;
  url: string;
  icon: string; // icon key to use
}

export const projectSummary = {
  title: "CSCI 1470 Deep Learning Final Project",
  shortDescription:
    "A semester-long research project where you'll apply deep learning to solve a real problem. Work in teams of 3-4 to either re-implement a research paper or develop a novel solution, gaining hands-on experience in research methodology, experimentation, and presentation.",
  fullDescription: `The final research project gives you the opportunity to apply deep learning concepts to tackle real-world problems. Through this project, you'll develop critical research skills including problem formulation, literature review, experimental design, and scientific communication. Whether you choose to reproduce a published paper or create an original solution, you'll present your work to peers and showcase your learning journey.`,
};

export const timeline: TimelineItem[] = [
  {
    id: 1,
    date: "2025-10-26",
    title: "Team Formation Deadline",
    description:
      "Form your team (3-4 people) or let us assign you a team. Submit the form to indicate your preference.",
    links: [
      {
        label: "Team Formation Form",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSe_rtf0-yQ5KgI_bdAK4LjxTpFI0_gBZ9d2TADmmwDUvdsZ8g/viewform?usp=dialog",
      },
    ],
  },
  {
    id: 2,
    date: "2025-10-28",
    title: "Final Team Assignments",
    description:
      "Your mentor TA will be assigned. Check for the announcement to see your team composition.",
    links: [],
  },
  {
    id: 3,
    date: "2025-11-03",
    title: "Project Check-in #1 (Week of Nov 3-7)",
    description:
      "Meet with your mentor TA for a brainstorming session. Come prepared with 2-3 project ideas and discuss feasibility and scope.",
    links: [],
  },
  {
    id: 4,
    date: "2025-11-10",
    title: "Project Proposal Due",
    description:
      "Submit your finalized project idea. Late submissions receive a 2% grade deduction.",
    links: [
      {
        label: "Project Proposal Form",
        url: "https://forms.gle/2m5uBepA4Htz9Zrg8",
      },
    ],
  },
  {
    id: 5,
    date: "2025-11-21",
    title: "Intermediate Project Report Due",
    description:
      "Submit a 2-page outline detailing your plan, methodology, data, and GitHub repo link. Include your outline with your mentor TA.",
    links: [],
  },
  {
    id: 6,
    date: "2025-12-01",
    title: "Project Check-in #2 (Week of Dec 1)",
    description:
      "Final check-in meeting with mentor. Submit a one-page reflection on progress, challenges, and next steps.",
    links: [],
  },
  {
    id: 7,
    date: "2025-12-11",
    title: "Deep Learning Day",
    description:
      "Celebrate your work! Present your poster to peers and explore other projects. Prepare a ~2 minute presentation.",
    links: [],
  },
  {
    id: 8,
    date: "2025-12-14",
    title: "Final Submission Deadline",
    description:
      "Hard deadline at 10 PM. Submit your poster (JPG), code (GitHub), and final writeup. No late days allowed.",
    links: [],
  },
];

export const importantLinks: ResourceLink[] = [
  {
    label: "Full Project Handout",
    url: "https://hackmd.io/@dlf25/H1_XDLY0xe",
    icon: "FaFileAlt",
  },
  {
    label: "Dev Post",
    url: "https://tinyurl.com/browndldaydevpost",
    icon: "FaCalendar",
  },
  {
    label: "DL Day Time Assignments",
    url: "https://docs.google.com/spreadsheets/d/1f1_56FWFWid9tKET-KZ6XpKSxvxIqE6R/edit?usp=sharing&ouid=109463779967402654555&rtpof=true&sd=true",
    icon: "FaCalendar",
  },
  {
    label: "DL Day Conflict Form",
    url: "https://forms.gle/TrZEJ7E7H6mjqFB38",
    icon: "FaCalendar",
  },
  {
    label: "Final Project Report Template",
    url: "https://www.overleaf.com/read/bsjnjggxsvfr#2efef3",
    icon: "FaCalendar",
  },
  {
    label: "Peer Evaluation Form",
    url: "https://forms.gle/4ebd1bM1qTXjwJEY7",
    icon: "FaClipboardList",
  },
];
