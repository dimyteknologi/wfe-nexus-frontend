import React from "react";
import { ProcessStep } from "@/types/data";
import { Database, BarChart3, Globe, Zap } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FLOW_PROCESS = (t: any): ProcessStep[] => [
  {
    step: "1",
    title: t.landing.howItWorks.steps.step1.title,
    description: t.landing.howItWorks.steps.step1.desc,
    icon: React.createElement(Database, { className: "w-8 h-8" }),
  },
  {
    step: "2",
    title: t.landing.howItWorks.steps.step2.title,
    description: t.landing.howItWorks.steps.step2.desc,
    icon: React.createElement(BarChart3, { className: "w-8 h-8" }),
  },
  {
    step: "3",
    title: t.landing.howItWorks.steps.step3.title,
    description: t.landing.howItWorks.steps.step3.desc,
    icon: React.createElement(Globe, { className: "w-8 h-8" }),
  },
  {
    step: "4",
    title: t.landing.howItWorks.steps.step4.title,
    description: t.landing.howItWorks.steps.step4.desc,
    icon: React.createElement(Zap, { className: "w-8 h-8" }),
  },
];
