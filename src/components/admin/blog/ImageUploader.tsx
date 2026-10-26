"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/admin/api";
import { btnSecondary, btnSmall, errorTextClass, labelClass } from "@/components/admin/ui";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 5;

export type UploadedImage = { url: string; publicId: string };

type Props = {
  value: UploadedImage | null;
  alt: string;
  onChange: (img: UploadedImage | null) => void;
  onUploadingChange: (uploading: boolean) => void;
  error?: string;
};

export function ImageUploader({ value, alt, onChange, onUploadingChange, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const uploading = progress !== null;

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    if (!ALLOWED.includes(file.type)) return setLocalError("Use a JPG, PNG or WebP image.");
    if (file.size > MAX_MB * 1024 * 1024) return setLocalError(`Image must be ${MAX_MB} MB or smaller.`);

    setLocalError(null);
    setProgress(0);
    onUploadingChange(true);
    try {
      const res = await uploadImage(file, setProgress);
      onChange({ url: res.url, publicId: res.publicId });
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setProgress(null);
      onUploadingChange(false);
    }
  }

  const shownError = localError ?? error;

  return (
    <div>
      <span id="field-image-label" tabIndex={-1} className={labelClass}>Featured image</span>

      {value ? (
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.url} alt={alt || "Featured image preview"} className="h-40 w-full rounded-lg border border-line bg-surface object-cover sm:w-64" />
          <div className="flex gap-2">
            <button type="button" className={`${btnSecondary} ${btnSmall}`} disabled={uploading} onClick={() => inputRef.current?.click()}>Replace</button>
            <button type="button" className={`${btnSecondary} ${btnSmall}`} disabled={uploading} onClick={() => onChange(null)}>Remove</button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          id="field-image"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          aria-describedby={shownError ? "field-image-error" : undefined}
          className="mt-2 flex h-40 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-line bg-white text-sm text-muted hover:border-brand sm:w-64"
        >
          <span className="font-semibold text-ink">{uploading ? "Uploading…" : "Choose an image"}</span>
          <span>JPG, PNG or WebP, up to {MAX_MB} MB</span>
        </button>
      )}

      <input ref={inputRef} type="file" accept={ALLOWED.join(",")} onChange={onPick} className="sr-only" tabIndex={-1} aria-labelledby="field-image-label" />

      {uploading ? (
        <div className="mt-3 max-w-xs" role="status">
          <progress className="h-2 w-full" max={100} value={progress ?? 0} aria-label="Upload progress" />
          <p className="text-xs text-muted">{progress}% uploaded</p>
        </div>
      ) : null}

      {shownError ? <p id="field-image-error" role="alert" className={errorTextClass}>{shownError}</p> : null}
    </div>
  );
}
