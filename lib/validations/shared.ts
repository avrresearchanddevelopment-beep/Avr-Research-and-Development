import { z } from "zod";

/**
 * An image reference: either a full http(s) URL, or a site-relative path
 * such as "/uploads/abc.png" (what /api/admin/upload returns). The old
 * z.string().url() rejected relative paths, which is why every upload
 * ended in "Validation failed".
 */
export const imageRef = z
  .string()
  .trim()
  .refine(
    (v) => v === "" || /^https?:\/\/\S+$/i.test(v) || /^\/(?!\/)[^\s]+$/.test(v),
    "Must be a full URL (https://...) or an uploaded image",
  );
