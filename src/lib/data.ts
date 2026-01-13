import { Code, Database, Globe, HardDrive, Layers, Linkedin, LucideIcon, Mail, Smartphone, GitBranch, Github, ExternalLink } from "lucide-react";

export const SKILLS = [
  {
    category: "Frontend",
    icon: Code,
    items: [
      { name: "React / Next.js", proficiency: 95 },
      { name: "TypeScript", proficiency: 90 },
      { name: "Tailwind CSS", proficiency: 95 },
      { name: "HTML5 & CSS3", proficiency: 98 },
    ],
  },
  {
    category: "Blockchain",
    icon: Layers,
    items: [
      { name: "Solidity", proficiency: 85 },
      { name: "Hardhat / Foundry", proficiency: 80 },
      { name: "Ethers.js / Web3.js", proficiency: 90 },
      { name: "Smart Contract Auditing", proficiency: 75 },
    ],
  },
  {
    category: "Backend",
    icon: HardDrive,
    items: [
      { name: "Node.js / Express", proficiency: 85 },
      { name: "Python / Django", proficiency: 70 },
      { name: "Firebase", proficiency: 90 },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    items: [
      { name: "PostgreSQL", proficiency: 80 },
      { name: "MongoDB", proficiency: 75 },
      { name: "Firestore", proficiency: 90 },
    ],
  },
];

export const PROJECTS = [
  {
    title: "DeFi Yield Aggregator",
    description: "A platform that optimizes yield farming strategies across various DeFi protocols. Built with Next.js, Solidity, and TheGraph.",
    techStack: ["Next.js", "Solidity", "Ethers.js", "TheGraph", "Tailwind CSS"],
    imageId: "project-1",
    links: [
      { icon: Github, url: "#" },
      { icon: ExternalLink, url: "#" },
    ],
  },
  {
    title: "Real-time Collaborative Editor",
    description: "A web-based editor allowing multiple users to edit documents simultaneously. Features rich text formatting and presence indicators.",
    techStack: ["React", "Firebase", "TipTap", "Node.js", "WebSocket"],
    imageId: "project-2",
    links: [
      { icon: Github, url: "#" },
      { icon: ExternalLink, url: "#" },
    ],
  },
  {
    title: "Portfolio Analytics Dashboard",
    description: "A tool for visualizing cryptocurrency portfolio performance with advanced charting and analytics. Integrates with multiple exchange APIs.",
    techStack: ["Next.js", "Recharts", "TypeScript", "Python", "FastAPI"],
    imageId: "project-3",
    links: [
      { icon: Github, url: "#" },
    ],
  },
];

export const EXPERIENCE = [
    {
      role: "Lead Frontend Engineer",
      company: "Innovatech Solutions",
      period: "2021 - Present",
      description: "Led the development of a new component library in React and TypeScript, improving development velocity by 30%. Architected and implemented a scalable frontend for a high-traffic e-commerce platform using Next.js."
    },
    {
      role: "Blockchain Developer",
      company: "Blockstart Inc.",
      period: "2019 - 2021",
      description: "Developed and deployed secure and optimized smart contracts on Ethereum. Integrated decentralized applications with various web3 wallets and services."
    },
    {
      role: "Software Engineer",
      company: "Tech Geniuses",
      period: "2017 - 2019",
      description: "Contributed to full-stack web applications using the MERN stack. Worked in an agile team to deliver new features and improvements."
    }
  ];
  
export const EDUCATION = [
    {
      degree: "B.Sc. in Computer Science",
      institution: "University of Technology",
      period: "2013 - 2017",
      description: "Graduated with honors. Focused on algorithms, data structures, and distributed systems. Published a paper on consensus algorithms."
    }
];

export const BLOG_POSTS = [
    {
      title: "Deep Dive into Next.js 14 Server Actions",
      excerpt: "Exploring the power of server actions for modern, full-stack React applications...",
      url: "#"
    },
    {
      title: "Understanding Gas Optimization in Solidity",
      excerpt: "Techniques and patterns for writing efficient and cost-effective smart contracts...",
      url: "#"
    },
    {
      title: "Why Tailwind CSS is My Go-To for Styling",
      excerpt: "A personal take on how utility-first CSS has transformed my workflow...",
      url: "#"
    }
];

export const AWARDS = [
  {
    title: "Innovator of the Year",
    issuer: "Innovatech Solutions",
    year: "2022",
    description: "Awarded for designing a novel state management system that reduced application load times by 50%.",
    imageId: "award-1"
  },
  {
    title: "Hackathon Winner - DeFi Track",
    issuer: "ETHGlobal",
    year: "2021",
    description: "First place for developing a prototype for an under-collateralized lending protocol.",
    imageId: "award-2"
  },
  {
    title: "Top Community Contributor",
    issuer: "Open Source Collective",
    year: "2020",
    description: "Recognized for significant contributions to several popular open-source Web3 libraries.",
    imageId: "award-3"
  }
];

export const CERTIFICATIONS = [
  {
    title: "Certified Solidity Developer",
    issuer: "Blockchain Council",
    year: "2021",
    url: "#",
    imageId: "cert-1"
  },
  {
    title: "Certified Kubernetes Application Developer",
    issuer: "The Linux Foundation",
    year: "2022",
    url: "#",
    imageId: "cert-2"
  },
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "2020",
    url: "#",
    imageId: "cert-3"
  }
];


export const NAVIGATION_LINKS = [
    { name: "About Me", href: "/" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "AI", href: "/ai" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
    { name: "GitHub", icon: Github, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "Mail", icon: Mail, url: "mailto:hello@majidlabs.com" }
];
