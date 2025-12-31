import React from "react";
import { Feature } from "@/types/data";
import { 
  BarChart3, 
  Globe, 
  Zap, 
  Users, 
  FileText, 
  Shield 
} from "lucide-react";

export const LANDING_FEATURES = (t: any): Feature[] => [
  {
    icon: React.createElement(BarChart3, { className: "w-6 h-6" }),
    title: t.landing.features.items.analytics.title,
    description: t.landing.features.items.analytics.desc,
    image: "./assets/analytics-demo.svg",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: React.createElement(Globe, { className: "w-6 h-6" }),
    title: t.landing.features.items.modeling.title,
    description: t.landing.features.items.modeling.desc,
    image: "./assets/modeling-demo.svg",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: React.createElement(Zap, { className: "w-6 h-6" }),
    title: t.landing.features.items.simulation.title,
    description: t.landing.features.items.simulation.desc,
    image: "./assets/simulation-demo.svg",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: React.createElement(Users, { className: "w-6 h-6" }),
    title: t.landing.features.items.collaboration.title,
    description: t.landing.features.items.collaboration.desc,
    image: "./assets/collaboration-demo.svg",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: React.createElement(FileText, { className: "w-6 h-6" }),
    title: t.landing.features.items.reporting.title,
    description: t.landing.features.items.reporting.desc,
    image: "./assets/reporting-demo.svg",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: React.createElement(Shield, { className: "w-6 h-6" }),
    title: t.landing.features.items.security.title,
    description: t.landing.features.items.security.desc,
    image: "./assets/security-demo.svg",
    color: "from-red-500 to-rose-500",
  },
];
