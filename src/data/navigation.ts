import type { FooterGroup, NavigationItem } from "@/types/navigation";
import { serviceLinks } from "./services";

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: serviceLinks,
  },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Blog", href: "/insights" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Life at Team Oreo", href: "/life-at-team-oreo" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: serviceLinks,
  },
  {
    title: "Resources",
    links: [
      { label: "Use Cases", href: "/use-cases" },
      { label: "Our Work", href: "/work" },
      { label: "Insights", href: "/insights" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Work With Us",
    links: [
      { label: "Careers", href: "/work-with-us" },
      {
        label: "Internship & Placement",
        href: "/work-with-us/internship-placement",
      },
    ],
  },
];

export const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
];
