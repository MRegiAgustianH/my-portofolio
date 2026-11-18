export type Project = {
  slug: string;
  title: string;
  stack: string[];
  description: string;
  features: string[];
  /** Path inside /public, e.g. "/projects/clinic.png". Leave undefined to show a placeholder. */
  screenshot?: string;
  /** Live website URL */
  demo?: string;
  /** GitHub repository URL */
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "clinic-information-system",
    title: "Clinic Information System",
    stack: ["Next.js", "NestJS"],
    description:
      "A web-based information system that supports day-to-day clinic operations, covering patient registration, patient records, medical services and clinic administration.",
    features: [
      "Patient registration and queueing",
      "Centralized patient records",
      "Service and visit management",
      "Clinic administration tools",
    ],
  },
  {
    slug: "landslide-early-warning",
    title: "IoT Landslide Early Warning System with Fuzzy Logic",
    stack: ["IoT", "TypeScript", "C++"],
    description:
      "An IoT early warning system for landslides. An ESP32 with sensors monitors soil conditions and slope tilt, and Fuzzy Logic classifies the risk as Safe, Alert or Danger.",
    features: [
      "ESP32 sensor node for soil and slope tilt",
      "Fuzzy Logic risk inference",
      "Three risk levels: Safe, Alert, Danger",
      "Firmware written in C++",
    ],
  },
  {
    slug: "extracurricular-training",
    title: "Extracurricular Training Management System",
    stack: ["Laravel", "Blade"],
    description:
      "A web-based system for running extracurricular training programs: participants, schedules, materials, attendance, assessment and activity reports.",
    features: [
      "Participant management",
      "Schedules and learning materials",
      "Attendance and assessment",
      "Activity reports",
    ],
  },
  {
    slug: "employee-performance-dss",
    title: "Employee Performance Decision Support System",
    stack: ["Laravel", "Inertia"],
    description:
      "A decision support system that evaluates employee performance across weighted criteria using the Simple Multi Attribute Rating Technique (SMART), so assessments are structured and objective.",
    features: [
      "Criteria and weight management",
      "Employee scoring per criterion",
      "SMART-based ranking",
      "Structured evaluation results",
    ],
  },
  {
    slug: "line-follower-q-learning",
    title: "Line Follower Robot Simulator with Q-Learning",
    stack: ["TypeScript"],
    description:
      "A browser-based line follower simulator where a robot learns to follow a track with Q-Learning. The learned strategy is exported as an Arduino program (.ino).",
    features: [
      "Q-Learning training on custom tracks",
      "Live robot navigation simulation",
      "Arduino .ino code generation",
      "Runs fully in the browser",
    ],
  },
  {
    slug: "thalassemia-expert-system",
    title: "Thalassemia Screening & Baby Trait Prediction Expert System",
    stack: ["Laravel", "Inertia"],
    description:
      "An expert system for early thalassemia risk screening that also predicts a baby’s physical characteristics from both parents’ phenotype data using Naive Bayes.",
    features: [
      "Early thalassemia risk screening",
      "Baby physical trait prediction",
      "Naive Bayes classification",
      "Input from both parents’ phenotypes",
    ],
  },
  {
    slug: "qoha-water-management",
    title: "Mineral Water Management System for PT Qoha Jaya Berkah",
    stack: ["Laravel", "Inertia"],
    description:
      "A web-based water management system designed and built for PT Qoha Jaya Berkah to improve data accuracy and work effectiveness.",
    features: [
      "Centralized operational data",
      "More accurate record keeping",
      "Faster day-to-day workflows",
    ],
  },
];
