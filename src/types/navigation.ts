export type NavigationItem = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

export type FooterGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};
