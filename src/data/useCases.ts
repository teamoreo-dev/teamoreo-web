export type UseCase = {
  slug: string; // route: /use-cases/[slug]
  title: string;
  category: string;
  /** Approved summary paragraph from the prototype. */
  summary: string;
  /** Illustration in /public, e.g. "/images/use-cases/your-royal-docks.svg". Optional until assets are supplied. */
  image?: string;
  /** Who builds the detail page; the gateway links to it regardless. */
  owner: "assigned" | "other";
  // Detail-page sections: render only when supplied.
  intro?: string;
  challenge?: string;
  approach?: string;
  outcomes?: string[];
};

// Copy transcribed from the approved Use Cases prototype, in prototype order.
// Slugs for the first-listed/inferred routes follow the prototype's own URLs
// (e.g. streamlining-operations-with-cloud-solutions-for-feex-group). Confirm before launch.
export const useCases: UseCase[] = [
  {
    slug: "your-royal-docks",
    title: "Your Royal Docks",
    category: "Web Platform",
    owner: "assigned",
    summary:
      "Your Royal Docks is a community engagement platform designed to foster collaboration between residents, visitors, and business owners in the Royal Docks area, a rapidly developing and culturally diverse part of London’s Newham borough. With the Royal Docks set to become a national hub for enterprise, employment, and innovation, this project aims to create an inclusive digital space that connects people with opportunities, local services, events, and one another. The initiative focuses on enhancing social participation, improving access to employment and business opportunities, and strengthening the community's social fabric by leveraging local knowledge and fostering trust in community organizations.",
  },
  {
    slug: "metropolitan-police-service-recruitment-portal",
    title: "Metropolitan Police Service Recruitment Portal",
    category: "Web Platform",
    owner: "assigned",
    summary:
      "We took on the mission to transform the Metropolitan Police Service’s job application website into a smooth and user-friendly experience. The project aimed to redesign the site’s layout and interface to make navigation easier, enhance visual appeal, and create a more accessible and engaging platform for potential applicants. From clear call-to-actions to an intuitive job tracking dashboard, the goal was to ensure the site attracted new talent and made the application process simple and seamless across all devices.",
  },
  {
    slug: "digital-transformation-for-a-retail-giant",
    title: "Digital Transformation for a Retail Giant",
    category: "Cloud Solution",
    owner: "assigned",
    summary:
      "We worked with Asian Market Place NYC, a leading retail chain based in New York, USA to drive their digital transformation initiative. The project aimed to modernize their legacy systems, integrate omnichannel sales platforms, and enhance customer experience through AI-driven analytics. The engagement spanned 18 months and involved cloud migration, ERP implementation, and data consolidation.",
  },
  {
    slug: "streamlining-operations-with-cloud-solutions-for-feex-group",
    title: "Streamlining Operations with Cloud Solutions for FEEX Group",
    category: "Cloud Solution",
    owner: "assigned",
    summary:
      "We worked with FEEX Group, a mid-sized manufacturing company based in Chicago, to modernize its outdated Software as a Service (SaaS). The goal was to enhance operational efficiency, reduce costs, and improve scalability. We implemented a tailored cloud-based solution to streamline their workflows, ensuring seamless data access and collaboration across multiple locations. The project spanned six months and covered planning and data migration.",
  },
  {
    slug: "emergency-support-app-to-combat-gender-based-violence",
    title: "Emergency Support App to Combat Gender-Based Violence",
    category: "Web Platform",
    owner: "other",
    summary:
      "Team Oreo developed Locate Me, a mobile application focused on helping users report emergencies such as domestic violence, sexual assault, or public harassment by sharing real-time location and live video streams with trusted contacts and police. The app offers multiple triggering options, including shake detection and voice recognition, ensuring discreet use in critical moments. Additional features like mental health chatbot support and a “report a crime” function aim to offer holistic safety. The app is now delivered to relevant organisations.",
  },
  {
    slug: "bespoke-business-solution-for-a-hospitality-industry",
    title: "Bespoke Business Solution for a Hospitality Industry",
    category: "IT Solutions",
    owner: "other",
    summary:
      "Spice Heritage, a premium Indian dining destination in Central London, contacted Team Oreo to enhance operational efficiency and customer experience. Despite its strong market presence, the restaurant faced underlying inefficiencies impacting profitability and service quality. Our Business Development team delivered a bespoke consultancy solution, combining data analysis, process optimisation, and staff training. The goal was to create a sustainable operational model that improves performance while maintaining the restaurant’s authentic culinary identity and premium service standards.",
  },
  {
    slug: "driving-revenue-growth-for-a-high-street-retail-business",
    title: "Driving Revenue Growth for a High-Street Retail Business",
    category: "Business Consultation",
    owner: "other",
    summary:
      "We work with a struggling retail business to improve sales performance, fix operational gaps, and create a scalable system for consistent growth. Within six months, the business saw a measurable increase in revenue, better stock control, and improved in-store performance.",
  },
];

export const getUseCase = (slug: string) => useCases.find((u) => u.slug === slug);