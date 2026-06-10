export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  altText: string;
  client?: string;
  year?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  metrics?: string;
  detailedSpecs?: string[];
  link?: string;
  collection?: string;
  clientAccount?: string;
  activeSpecimenDossier?: string;
  creativeDesignIntent?: string;
  campaignType?: string;
  distributionFormat?: string;
  visualStrategy?: string;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  aiFeedback?: string;
}
