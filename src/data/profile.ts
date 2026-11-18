export const profile = {
  name: "M Regi Agustian Heryandi",
  callsign: "ALING",
  role: "Fullstack Developer",
  slogan: "It’s not that you can’t, it’s just that you don’t know.",
  education: "Bachelor of Informatics Engineering",
  location: "Cianjur, West Java",
  coordinates: "6.82° S · 107.14° E",
  email: "muhmmad.regi@gmail.com",
  githubUser: "MRegiAgustianH",
  github: "https://github.com/MRegiAgustianH",
  instagramHandle: "regiiaah_",
  instagram: "https://instagram.com/regiiaah_",
  languages: ["Indonesian", "English"],
  about: [
    "I’m a fullstack developer from Cianjur, West Java, with a Bachelor of Informatics Engineering. I build web systems that run real operations: clinic administration, training management, decision support and expert systems.",
    "Outside the browser I work with IoT and robotics. I build ESP32 sensor systems, write the firmware, and teach programming and robotics to students at Myrobo School of Robotic.",
  ],
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
};

export const experience: Experience[] = [
  {
    role: "IT Programmer",
    org: "Klinik Utama Dr. H. A. Rotinsulu Cianjur",
    period: "2026 — 2027",
  },
  {
    role: "Web Developer",
    org: "Myrobo School of Robotic",
    period: "2023 — Present",
    current: true,
  },
  {
    role: "Instructor",
    org: "Myrobo School of Robotic",
    period: "2023 — Present",
    current: true,
  },
];

export const sections = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "activity", label: "Activity" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
