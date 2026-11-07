"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";
import { useHandleError } from "@/components/admin/useHandleError";
import { btnPrimary, btnSecondary, errorTextClass, inputClass, labelClass } from "@/components/admin/ui";
import { api, ApiError } from "@/lib/admin/api";
import { BLOG_CATEGORIES } from "@/lib/admin/categories";
import { textLength } from "@/lib/admin/format";
import type { Blog, BlogStatus } from "@/lib/admin/types";
import { ImageUploader, type UploadedImage } from "./ImageUploader";
import { RichTextEditor } from "./RichTextEditor";

type Errors = Partial<Record<"title" | "excerpt" | "content" | "category" | "author" | "image" | "alt", string>>;
const ORDER: (keyof Errors)[] = ["title", "excerpt", "content", "category", "author", "image", "alt"];

export function BlogForm({ mode, initial }: { mode: "create" | "edit"; initial?: Blog }) {
  const router = useRouter();
  const toast = useToast();
  const handleError = useHandleError();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "Team Oreo");
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription ?? "");
  const [image, setImage] = useState<UploadedImage | null>(
    initial?.featuredImage?.url ? { url: initial.featuredImage.url, publicId: initial.featuredImage.publicId ?? "" } : null,
  );
  const [alt, setAlt] = useState(initial?.featuredImage?.alt ?? "");

  const [errors, setErrors] = useState<Errors>({});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState<null | "draft" | "published">(null);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [snapshot] = useState(() => JSON.stringify({ title, excerpt, content, category, author, seoTitle, seoDescription, image, alt }));
  const leaving = useRef(false);

  const dirty = JSON.stringify({ title, excerpt, content, category, author, seoTitle, seoDescription, image, alt }) !== snapshot;

  // Warn before closing the tab / reloading with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      if (leaving.current) return;
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const categories: string[] = [...BLOG_CATEGORIES];
  if (category && !categories.includes(category)) categories.unshift(category); // keep legacy values editable

  function validate(): Errors {
    const e: Errors = {};
    if (title.trim().length < 3 || title.trim().length > 200) e.title = "Title must be 3–200 characters.";
    if (excerpt.trim().length < 10 || excerpt.trim().length > 500) e.excerpt = "Excerpt must be 10–500 characters.";
    if (textLength(content) < 10) e.content = "Write at least 10 characters of content.";
    if (!category) e.category = "Choose a category.";
    if (!author.trim()) e.author = "Author is required.";
    if (!image) e.image = "Upload a featured image.";
    if (image && !alt.trim()) e.alt = "Describe the image for screen-reader users.";
    return e;
  }

  function focusFirst(e: Errors) {
    const first = ORDER.find((k) => e[k]);
    if (!first) return;
    const id = first === "image" ? "field-image" : first === "content" ? "field-content" : `field-${first}`;
    (document.getElementById(id) ?? document.getElementById("field-image-label"))?.focus();
  }

  async function submit(status: BlogStatus) {
    if (saving || uploading) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return focusFirst(e);

    setSaving(status);
    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content,
      category,
      author: author.trim(),
      seoTitle: seoTitle.trim() || undefined,
      seoDescription: seoDescription.trim() || undefined,
      featuredImage: { url: image!.url, publicId: image!.publicId || undefined, alt: alt.trim() },
      status,
    };

    try {
      if (mode === "create") await api("/api/admin/blogs", { method: "POST", body: payload });
      else await api(`/api/admin/blogs/${initial!._id}`, { method: "PATCH", body: payload });

      leaving.current = true;
      toast.success(
        status === "published"
          ? mode === "edit" && initial?.status === "published" ? "Article updated" : "Article published"
          : mode === "edit" && initial?.status === "published" ? "Article unpublished" : "Draft saved",
      );
      router.push("/admin/blogs");
    } catch (err) {
      if (err instanceof ApiError && err.status === 400 && err.fields) {
        const f = err.fields;
        const mapped: Errors = {
          title: f.title, excerpt: f.excerpt, content: f.content, category: f.category, author: f.author,
          image: f["featuredImage.url"] ?? f.featuredImage,
        };
        setErrors(mapped);
        focusFirst(mapped);
        toast.error("Please fix the highlighted fields.");
      } else {
        handleError(err, "Could not save the article.");
      }
      setSaving(null);
    }
  }

  function cancel() {
    if (dirty) setDiscardOpen(true);
    else router.push("/admin/blogs");
  }

  const isPublished = mode === "edit" && initial?.status === "published";
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit(isPublished ? "published" : "draft");
      }}
      className="space-y-6"
    >
      {hasErrors ? (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">
          Please fix the highlighted fields below.
        </p>
      ) : null}

      <div>
        <label htmlFor="field-title" className={labelClass}>Title</label>
        <input id="field-title" value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)}
               aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "field-title-error" : undefined} className={inputClass} />
        {errors.title ? <p id="field-title-error" className={errorTextClass}>{errors.title}</p> : null}
      </div>

      <div>
        <label htmlFor="field-excerpt" className={labelClass}>Excerpt</label>
        <textarea id="field-excerpt" rows={3} value={excerpt} maxLength={500} onChange={(e) => setExcerpt(e.target.value)}
                  aria-invalid={Boolean(errors.excerpt)} aria-describedby={`field-excerpt-help${errors.excerpt ? " field-excerpt-error" : ""}`} className={inputClass} />
        <p id="field-excerpt-help" className="mt-1 text-xs text-muted">{excerpt.length}/500. Shown on article cards and search results.</p>
        {errors.excerpt ? <p id="field-excerpt-error" className={errorTextClass}>{errors.excerpt}</p> : null}
      </div>

      <div>
        <span id="field-content-label" className={labelClass}>Content</span>
        <div className="mt-1">
          <RichTextEditor value={content} onChange={setContent} invalid={Boolean(errors.content)} describedBy={errors.content ? "field-content-error" : undefined} />
        </div>
        {errors.content ? <p id="field-content-error" className={errorTextClass}>{errors.content}</p> : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="field-category" className={labelClass}>Category</label>
          <select id="field-category" value={category} onChange={(e) => setCategory(e.target.value)}
                  aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? "field-category-error" : undefined} className={inputClass}>
            <option value="">Select a category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category ? <p id="field-category-error" className={errorTextClass}>{errors.category}</p> : null}
        </div>
        <div>
          <label htmlFor="field-author" className={labelClass}>Author</label>
          <input id="field-author" value={author} maxLength={100} onChange={(e) => setAuthor(e.target.value)}
                 aria-invalid={Boolean(errors.author)} aria-describedby={errors.author ? "field-author-error" : undefined} className={inputClass} />
          {errors.author ? <p id="field-author-error" className={errorTextClass}>{errors.author}</p> : null}
        </div>
      </div>

      <ImageUploader value={image} alt={alt} onChange={setImage} onUploadingChange={setUploading} error={errors.image} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div><label htmlFor="field-seo-title" className={labelClass}>SEO title <span className="font-normal text-muted">(optional)</span></label><input id="field-seo-title" value={seoTitle} maxLength={200} onChange={(e) => setSeoTitle(e.target.value)} className={inputClass} /></div>
        <div><label htmlFor="field-seo-description" className={labelClass}>SEO description <span className="font-normal text-muted">(optional)</span></label><textarea id="field-seo-description" rows={3} value={seoDescription} maxLength={500} onChange={(e) => setSeoDescription(e.target.value)} className={inputClass} /></div>
      </div>

      <div>
        <label htmlFor="field-alt" className={labelClass}>Image alt text</label>
        <input id="field-alt" value={alt} maxLength={200} onChange={(e) => setAlt(e.target.value)}
               aria-invalid={Boolean(errors.alt)} aria-describedby={`field-alt-help${errors.alt ? " field-alt-error" : ""}`} className={inputClass} />
        <p id="field-alt-help" className="mt-1 text-xs text-muted">Briefly describe what the image shows.</p>
        {errors.alt ? <p id="field-alt-error" className={errorTextClass}>{errors.alt}</p> : null}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-end">
        <button type="button" onClick={cancel} disabled={saving !== null} className={btnSecondary}>Cancel</button>

        {isPublished ? (
          <>
            <button type="button" onClick={() => submit("draft")} disabled={saving !== null || uploading} className={btnSecondary}>
              {saving === "draft" ? "Unpublishing…" : "Unpublish"}
            </button>
            <button type="button" onClick={() => submit("published")} disabled={saving !== null || uploading} className={btnPrimary}>
              {saving === "published" ? "Saving…" : "Update"}
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => submit("draft")} disabled={saving !== null || uploading} className={btnSecondary}>
              {saving === "draft" ? "Saving…" : "Save Draft"}
            </button>
            <button type="button" onClick={() => submit("published")} disabled={saving !== null || uploading} className={btnPrimary}>
              {saving === "published" ? "Publishing…" : "Publish"}
            </button>
          </>
        )}
      </div>

      <ConfirmDialog
        open={discardOpen}
        title="Discard your changes?"
        description="You have unsaved changes. If you leave now they will be lost."
        confirmLabel="Discard changes"
        onConfirm={() => { leaving.current = true; router.push("/admin/blogs"); }}
        onCancel={() => setDiscardOpen(false)}
      />
    </form>
  );
}
