"use client";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import AdminNav from "./nav";
import Alert from "./Alert";
import { API_URL } from "./api";

const API = API_URL;
type Status = "draft" | "published" | "new" | "read" | "resolved";
type Section = "overview" | "blogs" | "contacts";
type BlogForm = { title: string; excerpt: string; content: string; category: string; author: string; status: "draft" | "published"; imageUrl: string; imageAlt: string; seoTitle: string; seoDescription: string };
interface Blog extends Omit<Partial<BlogForm>, "status"> { _id?: string; id?: string; title?: string; status?: Status; updatedAt?: string; createdAt?: string; featuredImage?: { url?: string; alt?: string }; }
interface Contact { _id?: string; id?: string; name?: string; email?: string; phone?: string; companyName?: string; subject?: string; message?: string; status?: Status; createdAt?: string; }
interface AdminUser { name?: string; email?: string; }
interface Summary { totalArticles?: number; publishedArticles?: number; totalEnquiries?: number; newEnquiries?: number; }
interface ConfirmState { title: string; message: string; action: () => Promise<void>; }
type ModalState = { mode: "create" } | { mode: "edit"; id: string };
interface ListResponse<T> { items?: T[]; }
const blankBlog: BlogForm = { title: "", excerpt: "", content: "", category: "General", author: "Team Oreo", status: "draft", imageUrl: "", imageAlt: "", seoTitle: "", seoDescription: "" };
async function request<T = Record<string, unknown>>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API}${path}`, { credentials: "include", ...options, headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...((options.headers ?? {}) as Record<string, string>) } });
  const result = await response.json().catch(() => ({})) as { success?: boolean; message?: string; error?: { message?: string }; data?: T };
  if (!response.ok || result.success === false) throw new Error(result.error?.message || result.message || `Request failed (${response.status})`);
  return (result.data ?? result) as T;
}
const date = (value?: string) => value ? new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—";
const idOf = (item: { _id?: string; id?: string }) => item._id || item.id || "";
function getErrorMessage(error: unknown, fallback: string) { return error instanceof Error ? error.message : fallback; }
function Badge({ status }: { status?: string }) { const safeStatus = status || "draft"; return <span className={`status-badge status-${safeStatus.toLowerCase()}`}>{safeStatus}</span>; }
function Empty({ title, detail }: { title: string; detail: string }) { return <div className="empty-state"><span className="empty-icon">⌁</span><b>{title}</b><p>{detail}</p></div>; }
function StatCard({ label, value, detail, icon }: { label: string; value?: string | number | null; detail: string; icon: string }) { return <article className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-icon">{icon}</span></div><strong>{value ?? "—"}</strong><small>{detail}</small></article>; }

export default function AdminDashboard() {
 const [active,setActive]=useState<Section>("overview"), [mobileOpen,setMobileOpen]=useState(false);
 const [admin,setAdmin]=useState<AdminUser | null>(null), [checking,setChecking]=useState(true), [busy,setBusy]=useState(false);
 const [summary,setSummary]=useState<Summary | null>(null), [blogs,setBlogs]=useState<Blog[]>([]), [contacts,setContacts]=useState<Contact[]>([]);
 const [blogSearch,setBlogSearch]=useState(""), [contactSearch,setContactSearch]=useState("");
 const [blogFilter,setBlogFilter]=useState<"all" | "draft" | "published">("all"), [contactFilter,setContactFilter]=useState<"all" | "new" | "read" | "resolved">("all");
 const [notice,setNotice]=useState(""), [error,setError]=useState("");
 const [modal,setModal]=useState<ModalState | null>(null), [blogForm,setBlogForm]=useState<BlogForm>({...blankBlog}), [selectedContact,setSelectedContact]=useState<Contact | null>(null);
 const [blogPage,setBlogPage]=useState(1), [contactPage,setContactPage]=useState(1);
 const [confirm,setConfirm]=useState<ConfirmState | null>(null);
 const pageSize=8;

 const loadAll=useCallback(async()=>{
   setError("");
   try {
     const [s,b,c]=await Promise.all([
       request<Summary>("/api/admin/dashboard/summary"),
       request<ListResponse<Blog>>("/api/admin/blogs?limit=200"),
       request<ListResponse<Contact>>("/api/admin/contacts?limit=200")
     ]);
     setSummary(s); setBlogs(b.items||[]); setContacts(c.items||[]);
   } catch(e: unknown) { setError(getErrorMessage(e, "Unable to load admin data.")); }
 },[]);
 useEffect(()=>{ let live=true; request<{admin?: AdminUser} & AdminUser>("/api/admin/auth/me").then(d=>{if(live)setAdmin(d.admin||d)}).catch(()=>{}).finally(()=>{if(live)setChecking(false)}); return()=>{live=false}; },[]);
 useEffect(()=>{if(admin)loadAll()},[admin,loadAll]);

 const filteredBlogs=useMemo(()=>blogs.filter(b=>(blogFilter==="all"||b.status===blogFilter)&&`${b.title||""} ${b.category||""} ${b.author||""}`.toLowerCase().includes(blogSearch.toLowerCase())),[blogs,blogFilter,blogSearch]);
 const filteredContacts=useMemo(()=>contacts.filter(c=>(contactFilter==="all"||c.status===contactFilter)&&`${c.name||""} ${c.email||""} ${c.companyName||""} ${c.subject||""}`.toLowerCase().includes(contactSearch.toLowerCase())),[contacts,contactFilter,contactSearch]);
 const blogPages=Math.max(1,Math.ceil(filteredBlogs.length/pageSize)), contactPages=Math.max(1,Math.ceil(filteredContacts.length/pageSize));
 const visibleBlogs=filteredBlogs.slice((blogPage-1)*pageSize,blogPage*pageSize), visibleContacts=filteredContacts.slice((contactPage-1)*pageSize,contactPage*pageSize);
 useEffect(()=>setBlogPage(1),[blogSearch,blogFilter]); useEffect(()=>setContactPage(1),[contactSearch,contactFilter]);

 function newBlog(){setError("");setBlogForm({...blankBlog});setModal({mode:"create"});}
 function editBlog(blog: Blog){setError("");setBlogForm({title:blog.title||"",excerpt:blog.excerpt||"",content:blog.content||"",category:blog.category||"General",author:blog.author||"Team Oreo",status:blog.status === "published" ? "published" : "draft",imageUrl:blog.featuredImage?.url||"",imageAlt:blog.featuredImage?.alt||"",seoTitle:blog.seoTitle||"",seoDescription:blog.seoDescription||""});setModal({mode:"edit",id:idOf(blog)});}
 async function saveBlog(e: FormEvent<HTMLFormElement>){
   e.preventDefault();setBusy(true);setError("");
   try {
     const payload={title:blogForm.title.trim(),excerpt:blogForm.excerpt.trim(),content:blogForm.content,category:blogForm.category.trim(),author:blogForm.author.trim(),status:blogForm.status,featuredImage:{url:blogForm.imageUrl.trim(),alt:blogForm.imageAlt.trim()},seoTitle:blogForm.seoTitle,seoDescription:blogForm.seoDescription};
     if(modal?.mode==="create") await request("/api/admin/blogs",{method:"POST",body:JSON.stringify(payload)});
     else if (modal?.mode === "edit") await request(`/api/admin/blogs/${modal.id}`,{method:"PATCH",body:JSON.stringify(payload)});
     setModal(null);setNotice(modal?.mode==="create"?"Article created successfully.":"Article updated successfully.");await loadAll();
   } catch(e: unknown){setError(getErrorMessage(e, "Unable to save article."));} finally{setBusy(false);}
 }
 async function deleteBlog(blog: Blog){
   setConfirm({title:"Delete article?",message:`“${blog.title}” will be permanently deleted. This action cannot be undone.`,action:async()=>{
     await request(`/api/admin/blogs/${idOf(blog)}`,{method:"DELETE"});setNotice("Article deleted.");await loadAll();
   }});
 }
 async function openContact(contact: Contact){setError("");try{const d=await request<Contact>(`/api/admin/contacts/${idOf(contact)}`);setSelectedContact(d)}catch(e: unknown){setError(getErrorMessage(e, "Unable to open submission."));}}
 async function updateContactStatus(contact: Contact, status: "new" | "read" | "resolved"){try{await request(`/api/admin/contacts/${idOf(contact)}`,{method:"PATCH",body:JSON.stringify({status})});setSelectedContact({...contact,status});setNotice("Enquiry status updated.");await loadAll();}catch(e: unknown){setError(getErrorMessage(e, "Unable to update enquiry status."));}}
 async function deleteContact(contact: Contact){setConfirm({title:"Delete submission?",message:`The enquiry from ${contact.name||"this contact"} will be permanently deleted.`,action:async()=>{await request(`/api/admin/contacts/${idOf(contact)}`,{method:"DELETE"});setSelectedContact(null);setNotice("Enquiry deleted.");await loadAll();}});}
 async function logout(){try{await request("/api/admin/auth/logout",{method:"POST"});}catch{}setAdmin(null);window.location.href="/";}

// if(!admin)return <div className="screen-center"><section className="panel session-panel"><h1>Admin sign-in required</h1><p>Please sign in with an authorised Team Oreo account to manage content.</p><a className="btn btn-primary" href="/admin/login">Go to sign in</a></section></div>;

 if (checking) return <div className="screen-center"><section className="panel session-panel"><p>Checking your admin session…</p></section></div>;
 if (!admin) return <div className="screen-center"><section className="panel session-panel"><h1>Admin sign-in required</h1><p>Please sign in with an authorised Team Oreo account to manage content.</p><a className="btn btn-primary" href="/admin/login">Go to sign in</a></section></div>;

 if (checking) return <div className="screen-center"><section className="panel session-panel"><p>Checking your admin session…</p></section></div>;
 if (!admin) return <div className="screen-center"><section className="panel session-panel"><h1>Admin sign-in required</h1><p>Please sign in with an authorised Team Oreo account to manage content.</p><a className="btn btn-primary" href="/admin/login">Go to sign in</a></section></div>;

 return <div className="admin-shell">
   <AdminNav active={active} onNavigate={(id: Section)=>{setActive(id);setSelectedContact(null)}} mobileOpen={mobileOpen} onClose={()=>setMobileOpen(false)}/>
   <div className="main-column">
    <header className="topbar">
      <button className="mobile-menu" aria-label="Toggle navigation" onClick={()=>setMobileOpen(v=>!v)}>☰</button>
      <div className="breadcrumbs">Workspace <span>/</span>
        <b>{({overview:"Overview",blogs:"Blog content",contacts:"Form submissions"} satisfies Record<Section, string>)[active]}</b>
      </div>
      <div className="topbar-right">
        <span className="topbar-status">Admin session active</span>
        <div className="avatar">{(admin?.name||admin?.email||"A").slice(0,1).toUpperCase()}</div>
        <button className="logout-btn" onClick={logout}>Sign out</button>
      </div>
    </header>
    <main className="page-content">
     <Alert type="success" message={notice} onDismiss={()=>setNotice("")}/><Alert type="error" message={error} onDismiss={()=>setError("")}/>
     {active==="overview"&&<>
     <div className="page-heading">
      <div>
        <div className="eyebrow">YOUR WORKSPACE</div>
          <h1>Good {new Date().getHours()<12?"morning":new Date().getHours()<18?"afternoon":"evening"}{admin?.name?`, ${admin.name.split(" ")[0]}`:""} <span>✦</span></h1>
          <p>Here’s what’s happening across your Team Oreo website.</p>
        </div>
        <button className="btn btn-primary" onClick={newBlog}>＋ New article</button>
      </div>
      <div className="stats-grid">
        <StatCard label="Total articles" value={summary?.totalArticles??blogs.length} detail={`${summary?.publishedArticles??blogs.filter(b=>b.status==="published").length} published`} icon="▤"/>
        <StatCard label="Published articles" value={summary?.publishedArticles??blogs.filter(b=>b.status==="published").length} detail="Visible to your audience" icon="↗"/>
        <StatCard label="Form submissions" value={summary?.totalEnquiries??contacts.length} detail="Website enquiries" icon="✉"/>
        <StatCard label="Needs attention" value={summary?.newEnquiries??contacts.filter(c=>c.status==="new").length} detail="New enquiries" icon="◷"/>
      </div>
      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Recent articles</h2>
              <p>Latest updates from your blog</p>
            </div>
            <button className="text-button" onClick={()=>setActive("blogs")}>View all →</button>
          </div>{blogs.slice(0,5).length?<div className="recent-list">{blogs.slice(0,5).map(b=><div className="recent-item" key={idOf(b)}>
          <div className="article-thumb">▤</div>
          <div className="recent-copy">
            <b>{b.title}</b><small>{b.category||"General"} · Updated {date(b.updatedAt||b.createdAt)}</small>
          </div>
          <Badge status={b.status}/>
          <button className="icon-button" onClick={()=>{editBlog(b);setActive("blogs")}} aria-label={`Edit ${b.title}`}>↗</button>
          </div>)}</div>:<Empty title="No articles yet" detail="Create your first article to get started."/>}<div className="panel-footer">
          <button className="btn btn-secondary" onClick={()=>setActive("blogs")}>Manage blog content</button>
          </div>
        </section>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Recent enquiries</h2>
            <p>Messages submitted through your forms</p>
          </div><button className="text-button" onClick={()=>setActive("contacts")}>View all →</button>
        </div>{contacts.slice(0,5).length?<div className="enquiry-list">{contacts.slice(0,5).map(c=><button className="enquiry-item" key={idOf(c)} onClick={()=>{setActive("contacts");openContact(c)}}><span className="contact-avatar">{(c.name||"?").slice(0,1).toUpperCase()}</span>
        <span className="enquiry-copy"><b>{c.name}</b><small>{c.subject||c.email}</small></span>
        <Badge status={c.status}/></button>)}</div>:<Empty title="No submissions yet" detail="New website enquiries will appear here."/>}
        <div className="panel-footer">
          <button className="btn btn-secondary" onClick={()=>setActive("contacts")}>Review submissions</button>
          </div>
      </section>
      </div></>}
     {active==="blogs"&&<>
     <div className="page-heading">
      <div>
        <div className="eyebrow">PUBLISHING</div>
        <h1>Blog content</h1><p>Create, update and manage articles on the Team Oreo website.</p>
        </div>
        <button className="btn btn-primary" onClick={newBlog}>＋ Create article</button>
        </div>
      <section className="panel table-panel">
        <div className="toolbar">
          <div className="search-box">
            <span>⌕</span>
            <input aria-label="Search articles" value={blogSearch} onChange={e=>setBlogSearch(e.currentTarget.value)} placeholder="Search articles…"/>
          </div>
          <select aria-label="Filter article status" value={blogFilter} onChange={e=>setBlogFilter(e.currentTarget.value as typeof blogFilter)}>
            <option value="all">All statuses</option><option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <button className="btn btn-secondary refresh-btn" onClick={loadAll}>↻ Refresh</button>
        </div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>ARTICLE</th><th>CATEGORY</th><th>STATUS</th><th>LAST UPDATED</th><th>ACTIONS</th></tr></thead>
            <tbody>{visibleBlogs.map(b=><tr key={idOf(b)}><td><div className="table-title">
              <div className="table-thumb">{b.featuredImage?.url?<img src={b.featuredImage.url} alt={b.featuredImage.alt||""}/>: "▤"}</div>
              <div><b>{b.title}</b><small>{b.author||"Team Oreo"}</small></div>
              </div></td><td>{b.category||"General"}</td><td>
              <Badge status={b.status}/></td><td>{date(b.updatedAt||b.createdAt)}</td><td>
                <div className="row-actions"><button className="action-link" onClick={()=>editBlog(b)}>Edit</button>
                <button className="action-link danger-text" onClick={()=>deleteBlog(b)}>Delete</button></div></td></tr>)}
            </tbody>
          </table>
        </div>{!filteredBlogs.length&&<Empty title="No matching articles" detail={blogs.length?"Try another search or status filter.":"Create an article to see it listed here."}/>}
        <Pagination page={blogPage} pages={blogPages} total={filteredBlogs.length} size={pageSize} onChange={setBlogPage}/></section></>}
     {active==="contacts"&&<>
     <div className="page-heading"><div><div className="eyebrow">INBOX</div>
     <h1>Form submissions</h1><p>Review messages from contact forms and track follow-up status.</p></div>
     <button className="btn btn-secondary" onClick={loadAll}>↻ Refresh submissions</button></div>
     <section className="panel table-panel"><div className="toolbar"><div className="search-box"><span>⌕</span>
        <input aria-label="Search submissions" value={contactSearch} onChange={e=>setContactSearch(e.currentTarget.value)} placeholder="Search name, email or company…"/>
        </div>
        <select aria-label="Filter enquiry status" value={contactFilter} onChange={e=>setContactFilter(e.currentTarget.value as typeof contactFilter)}>
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="resolved">Resolved</option>
        </select></div><div className="table-scroll">
        <table>
          <thead><tr><th>CONTACT</th><th>SUBJECT</th><th>RECEIVED</th><th>STATUS</th><th>ACTION</th></tr></thead>
          <tbody>{visibleContacts.map(c=><tr key={idOf(c)}><td><div className="table-title">
            <span className="contact-avatar">{(c.name||"?").slice(0,1).toUpperCase()}</span>
            <div><b>{c.name}</b><small>{c.email}</small></div></div>
            </td><td>{c.subject||c.companyName||"Website enquiry"}</td>
            <td>{date(c.createdAt)}</td><td><Badge status={c.status}/></td><td>
            <button className="action-link" onClick={()=>openContact(c)}>Review →</button></td></tr>)}
          </tbody>
        </table></div>{!filteredContacts.length&&<Empty title="No matching submissions" detail={contacts.length?"Try another search or status filter.":"Submitted contact forms will appear here."}/>}
        <Pagination page={contactPage} pages={contactPages} total={filteredContacts.length} size={pageSize} onChange={setContactPage}/></section></>}
    </main><footer className="app-footer"><span>© {new Date().getFullYear()} Team Oreo</span><span>Built for focused work <b>✦</b></span></footer>
   </div>
   {modal&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null)}}>
    <section className="modal blog-modal" role="dialog" aria-modal="true" aria-labelledby="blog-modal-title">
      <div className="modal-header"><div><div className="eyebrow">{modal.mode==="create"?"NEW CONTENT":"CONTENT EDITOR"}</div>
      <h2 id="blog-modal-title">{modal.mode==="create"?"Create an article":"Edit article"}</h2><p>Fields marked with * are required.</p></div>
      <button className="icon-button close-button" onClick={()=>setModal(null)} aria-label="Close">×</button>
      </div><form onSubmit={saveBlog} className="blog-form">
    <label className="wide-field">Article title *<input required minLength={3} maxLength={200} value={blogForm.title} onChange={e=>setBlogForm({...blogForm,title:e.currentTarget.value})}/></label>
    <label>Category *<input required value={blogForm.category} onChange={e=>setBlogForm({...blogForm,category:e.currentTarget.value})}/></label><label>Author *<input required value={blogForm.author} onChange={e=>setBlogForm({...blogForm,author:e.currentTarget.value})}/></label>
    <label className="wide-field">Excerpt *<textarea required minLength={10} maxLength={500} rows={3} value={blogForm.excerpt} onChange={e=>setBlogForm({...blogForm,excerpt:e.currentTarget.value})}/></label>
    <label className="wide-field">Article content *<textarea required minLength={10} rows={9} value={blogForm.content} onChange={e=>setBlogForm({...blogForm,content:e.currentTarget.value})} placeholder="Write the full article content here."/></label>
    <label className="wide-field">Featured image URL *<input required type="url" value={blogForm.imageUrl} onChange={e=>setBlogForm({...blogForm,imageUrl:e.currentTarget.value})} placeholder="https://example.com/image.jpg"/></label>
    <label className="wide-field">Image alt text<input value={blogForm.imageAlt} onChange={e=>setBlogForm({...blogForm,imageAlt:e.currentTarget.value})}/></label><label>SEO title<input value={blogForm.seoTitle} onChange={e=>setBlogForm({...blogForm,seoTitle:e.currentTarget.value})}/></label><label>SEO description<input value={blogForm.seoDescription} onChange={e=>setBlogForm({...blogForm,seoDescription:e.currentTarget.value})}/></label>
    <label className="wide-field">Publication status<select value={blogForm.status} onChange={e=>setBlogForm({...blogForm,status:e.currentTarget.value as BlogForm["status"]})}><option value="draft">Save as draft</option><option value="published">Publish article</option></select></label><div className="modal-footer wide-field"><button type="button" className="btn btn-secondary" onClick={()=>setModal(null)}>Cancel</button><button type="submit" className="btn btn-primary" disabled={busy}>{busy?"Saving…":modal.mode==="create"?"Create article":"Save changes"}</button></div>
   </form></section></div>}
   {selectedContact&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setSelectedContact(null)}}><section className="modal contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title"><div className="modal-header"><div><div className="eyebrow">SUBMISSION DETAILS</div><h2 id="contact-title">Enquiry from {selectedContact.name}</h2></div><button className="icon-button close-button" onClick={()=>setSelectedContact(null)} aria-label="Close">×</button></div><div className="contact-detail-grid">{[["Full name",selectedContact.name],["Company",selectedContact.companyName],["Email address",selectedContact.email],["Phone",selectedContact.phone],["Subject",selectedContact.subject],["Received",date(selectedContact.createdAt)]].map(([label,value])=><div key={label}><label>{label}</label><p>{value||"—"}</p></div>)}<div className="detail-message"><label>Message</label><p>{selectedContact.message||"No message was provided."}</p></div></div><div className="modal-footer"><button className="btn btn-danger-outline" onClick={()=>deleteContact(selectedContact)}>Delete enquiry</button><div className="footer-actions"><label className="status-select-label">Update status<select value={selectedContact.status||"new"} onChange={e=>updateContactStatus(selectedContact,e.currentTarget.value as "new" | "read" | "resolved")}><option value="new">New</option><option value="read">Read</option><option value="resolved">Resolved</option></select></label><button className="btn btn-secondary" onClick={()=>setSelectedContact(null)}>Done</button></div></div></section></div>}
   {confirm&&<div className="modal-backdrop" role="presentation"><section className="modal confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title"><div className="modal-header"><div><h2 id="confirm-title">{confirm.title}</h2><p>{confirm.message}</p></div></div><div className="modal-footer"><button className="btn btn-secondary" onClick={()=>setConfirm(null)}>Cancel</button><button className="btn btn-danger-outline" onClick={async()=>{const action=confirm.action;setConfirm(null);try{await action()}catch(e: unknown){setError(getErrorMessage(e, "Action failed."))}}}>Yes, delete</button></div></section></div>}
  </div>;
}
function Pagination({page,pages,total,size,onChange}: { page: number; pages: number; total: number; size: number; onChange: (page: number) => void }) {
 const start=total?((page-1)*size)+1:0, end=Math.min(page*size,total);
 return <div className="table-bottom pagination"><span>Showing {start}–{end} of {total}</span><div className="pagination-actions"><button className="btn btn-secondary" disabled={page<=1} onClick={()=>onChange(page-1)}>Previous</button><span>Page {page} of {pages}</span><button className="btn btn-secondary" disabled={page>=pages} onClick={()=>onChange(page+1)}>Next</button></div></div>;
}
