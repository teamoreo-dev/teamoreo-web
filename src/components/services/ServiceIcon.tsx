import type { ReactNode } from "react";

const icons: Record<string, ReactNode> = {
  "it-consultancy": <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
  "web-development": <><rect x="2" y="3" width="20" height="16" rx="2" /><path d="M2 7h20m-13 4-3 2 3 2m6-4 3 2-3 2M8 22h8m-4-3v3" /></>,
  "app-development": <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 5h4M10 18h4M9 10h6m-6 3h4" /></>,
  "ui-design": <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 8h18M9 8v13m3-9h6m-6 4h4" /></>,
  "ux-design": <><circle cx="7" cy="6" r="3" /><circle cx="17" cy="18" r="3" /><path d="M10 6h6a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8M7 9v3m10-3v6" /></>,
  "project-management": <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5" /></>,
  "artificial-intelligence": <><rect x="6" y="6" width="12" height="12" rx="3" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m12 0h4M2 15h4m12 0h4m-12-5h4v4h-4z" /></>,
  "blockchain-technology": <><path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Zm0 9L4 6.5m8 4.5 8-4.5M12 11v9" /><circle cx="12" cy="11" r="1.5" /></>,
};

export function ServiceIcon({ slug }: { slug: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[slug]}
    </svg>
  );
}
