import type { LucideIcon } from "lucide-react";
import {
  HandCoins,
  Building2,
  ClipboardCheck,
  Calculator,
  UserPlus,
  Wallet,
  FileText,
  FileCheck,
} from "lucide-react";

export type ServiceDisplayItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: ServiceDisplayItem[] = [
  {
    title: "Project Financing",
    description: "We provide seamless funding support for business growth",
    icon: HandCoins,
  },
  {
    title: "Company Law | ROC Compliances",
    description: "We provide timely compliances for your business",
    icon: Building2,
  },
  {
    title: "Audit & Assurance services",
    description: "We provide Internal Audits, Bank Audit Services etc",
    icon: ClipboardCheck,
  },
  {
    title: "Income Tax Return | GST Return Filings",
    description: "We prepare everything you need for your tax return",
    icon: Calculator,
  },
  {
    title: "Startup & MSME Registration",
    description: "End-to-end registration and advisory for startups and MSMEs",
    icon: UserPlus,
  },
  {
    title: "Wealth Management",
    description: "Thoughtful investment advisory and portfolio guidance",
    icon: Wallet,
  },
  {
    title: "Financial Planning",
    description: "Structured planning for goals, cash flow, and long-term growth",
    icon: FileText,
  },
  {
    title: "GST Services",
    description: "Registration, returns, and compliance handled with clarity",
    icon: FileCheck,
  },
];
