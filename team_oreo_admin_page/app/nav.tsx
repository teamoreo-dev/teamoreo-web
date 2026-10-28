"use client";

export type AdminSection = "overview" | "blogs" | "contacts";
interface AdminNavProps {
  active: AdminSection;
  onNavigate: (section: AdminSection) => void;
  mobileOpen: boolean;
  onClose?: () => void;
}
const links: { id: AdminSection; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "▦" },
  { id: "blogs", label: "Blog content", icon: "▤" },
  { id: "contacts", label: "Form submissions", icon: "✉" },
];

export default function AdminNav({ active, onNavigate, mobileOpen, onClose }: AdminNavProps) {
  return (
    <aside className={`admin-sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="brand"><a aria-label="Team Oreo home" className="hd-logo" href="/"><img alt="Team Oreo" width={156} height={40} src="/logos.png" /></a></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav aria-label="Administration navigation">
        {links.map((item) => (
          <button key={item.id} type="button" aria-current={active === item.id ? "page" : undefined}
            className={`nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => { onNavigate(item.id); onClose?.(); }}>
            <span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
            {item.id === "contacts" && <span className="nav-arrow" aria-hidden="true">›</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom"><div className="secure-note"><span aria-hidden="true">●</span><div><b>Private workspace</b><small>Authorised access only</small></div></div><p>Team Oreo · Admin</p></div>
    </aside>
  );
}
