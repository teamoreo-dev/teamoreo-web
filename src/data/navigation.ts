import type { FooterGroup, NavigationItem } from "@/types/navigation";
import { serviceLinks } from "./services";

export const navigation: NavigationItem[] = [
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
      { label: "Insights", href: "/insights" },
      { label: "FAQ", href: "/faq" },
      { label: "Certificate", href: "/certificates" },
      { label: "Community Hub", href: "/community-hub" },
    ],
  },
  {
    title: "Work With Us",
    links: [
      { label: "Careers", href: "/careers" },
      {
        label: "Internship & Placement",
        href: "/work-with-us/internship-placement",
      },
    ],
  },
];

export const legalLinks = [{ label: "Privacy", href: "/privacy-policy" }];
