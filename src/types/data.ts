import { ReactNode } from "react";

export interface Organization {
  id: number;
  name: string;
  imgSrc: string;
}

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  image: string;
  color: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface NavItem {
  href: string;
  label: string;
  subItems?: NavItem[];
}

export interface MetricData {
  label: string;
  value: number;
  change?: number;
  trend?: "up" | "down" | "neutral";
}
