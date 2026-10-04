import type { Faq, Proof } from "./data";

export interface Section {
  h: string;
  p: string[];
  bullets?: string[];
  checklist?: string[];   // rendered as an interactive, checkable list
}

export type Cluster = "clinic" | "web" | "restaurant" | "guide";

export interface Content {
  kind: "landing" | "guide";
  cluster: Cluster;
  slug: string;
  path: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  sections: Section[];
  faqs: Faq[];
  proof?: Proof;
  related: string[];      // paths
  keywords: string[];
  ctaMessage: string;
  ctaLabel: string;
  accent: string;
  datePublished?: string; // guides
  readMins?: number;      // guides
}
