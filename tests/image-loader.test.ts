import { describe, expect, it } from "vitest";
import imageLoader from "@/lib/image-loader";

describe("imageLoader", () => {
  it("maps a hashed static import to its generated width", () => {
    expect(imageLoader({ src: "/_next/static/media/burger-detoure-PROVISOIRE-ia.1a6cruldev6cd.webp", width: 320 })).toBe(
      "/images/w/burger-detoure-PROVISOIRE-ia-320.webp",
    );
  });

  it("keeps hyphens and underscores of the hash out of the name", () => {
    expect(imageLoader({ src: "/_next/static/media/tacos-detoure-PROVISOIRE-ia.3-atqf4l7_b7e.webp", width: 160 })).toBe(
      "/images/w/tacos-detoure-PROVISOIRE-ia-160.webp",
    );
  });
});
