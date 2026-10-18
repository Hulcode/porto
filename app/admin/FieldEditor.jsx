"use client";

import Image from "next/image";
import { useState } from "react";

const fieldLabel = (value) =>
  value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (letter) => letter.toUpperCase());

function blankFrom(template) {
  if (typeof template === "string") return "";
  if (typeof template === "boolean") return false;
  if (Array.isArray(template)) return [];
  if (template && typeof template === "object") {
    return Object.fromEntries(
      Object.entries(template).map(([key, value]) => [key, blankFrom(value)]),
    );
  }
  return "";
}

function ImageField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function uploadImage(file) {
    setUploadError("");
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setUploadError("Choose a JPG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Images must be 10 MB or smaller.");
      return;
    }

    setUploading(true);
    try {
      const signatureResponse = await fetch("/api/admin/cloudinary-signature", {
        method: "POST",
      });
      const signatureData = await signatureResponse.json();
      if (!signatureResponse.ok) {
        throw new Error(signatureData.error || "Could not authorize image upload.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.apiKey);
      formData.append("timestamp", String(signatureData.timestamp));
      formData.append("folder", signatureData.folder);
      formData.append("signature", signatureData.signature);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        { method: "POST", body: formData },
      );
      const uploaded = await uploadResponse.json();
      if (!uploadResponse.ok || !uploaded.secure_url) {
        throw new Error(uploaded.error?.message || "Cloudinary upload failed.");
      }

      onChange(uploaded.secure_url);
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      {value && (
        <div className="relative h-36 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background">
          <Image src={value} alt={`${label} preview`} fill sizes="384px" className="object-cover" />
        </div>
      )}
      <input
        type="url"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="/assets/image.jpg or Cloudinary URL"
        className="admin-input"
      />
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition hover:border-primary hover:text-primary">
        {uploading ? "Uploading..." : "Upload image"}
        <input
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={uploading}
          onChange={(event) => {
            uploadImage(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </label>
      {uploadError && <p className="text-sm text-red-400">{uploadError}</p>}
    </div>
  );
}

export default function FieldEditor({
  label,
  value,
  onChange,
  onRemove,
  template,
}) {
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 text-sm">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 accent-primary"
        />
        {label}
      </label>
    );
  }

  if (typeof value === "string" && /image|photo/i.test(label)) {
    return <ImageField label={label} value={value} onChange={onChange} />;
  }

  if (typeof value === "string") {
    const multiline = value.length > 90 || /description|paragraph|quote|why/i.test(label);
    return (
      <label className="block space-y-2 text-sm font-medium">
        <span>{label}</span>
        {multiline ? (
          <textarea
            rows={Math.min(8, Math.max(3, Math.ceil(value.length / 90)))}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="admin-input resize-y"
          />
        ) : (
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="admin-input"
          />
        )}
      </label>
    );
  }

  if (Array.isArray(value)) {
    const stringsOnly = value.every((entry) => typeof entry === "string");
    if (stringsOnly) {
      return (
        <label className="block space-y-2 text-sm font-medium">
          <span>{label} <span className="font-normal text-muted-foreground">(one per line)</span></span>
          <textarea
            rows={Math.min(10, Math.max(3, value.length))}
            value={value.join("\n")}
            onChange={(event) => onChange(event.target.value.split("\n"))}
            className="admin-input resize-y"
          />
        </label>
      );
    }

    const itemTemplate = template?.[0] ?? value[0] ?? {};
    return (
      <section className="space-y-4 rounded-2xl border border-border/80 bg-background/30 p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold">{label}</h3>
          <button
            type="button"
            onClick={() =>
              onChange([...value, blankFrom(itemTemplate)])
            }
            className="rounded-full border border-primary/50 px-3 py-1.5 text-sm text-primary hover:bg-primary/10"
          >
            Add item
          </button>
        </div>
        {value.map((entry, index) => (
          <div key={index} className="relative rounded-xl border border-border p-4">
            {typeof entry === "object" && entry !== null && !Array.isArray(entry) ? (
              <div className="space-y-4 pr-2">
                {Object.entries(entry).map(([key, child]) => (
                  <FieldEditor
                    key={key}
                    label={fieldLabel(key)}
                    value={child}
                    onChange={(updated) => {
                      const next = [...value];
                      next[index] = { ...entry, [key]: updated };
                      onChange(next);
                    }}
                    template={template?.[key]}
                  />
                ))}
              </div>
            ) : (
              <FieldEditor
                label={`${label} ${index + 1}`}
                value={entry}
                onChange={(updated) => {
                  const next = [...value];
                  next[index] = updated;
                  onChange(next);
                }}
              />
            )}
            <button
              type="button"
              onClick={() => onChange(value.filter((_, entryIndex) => entryIndex !== index))}
              aria-label={`Remove ${label} ${index + 1}`}
              className="mt-4 text-sm text-red-400 hover:text-red-300"
            >
              Remove item
            </button>
          </div>
        ))}
      </section>
    );
  }

  if (value && typeof value === "object") {
    return (
      <section className="space-y-4 rounded-2xl border border-border/80 bg-background/30 p-4">
        <h3 className="font-semibold">{label}</h3>
        {Object.entries(value).map(([key, child]) => (
          <FieldEditor
            key={key}
            label={fieldLabel(key)}
            value={child}
            onChange={(updated) => onChange({ ...value, [key]: updated })}
          />
        ))}
      </section>
    );
  }

  return (
    <div>
      {onRemove && (
        <button type="button" onClick={onRemove} className="text-sm text-red-400">
          Remove
        </button>
      )}
    </div>
  );
}
