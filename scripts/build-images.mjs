/**
 * Generates public/images/w/<name>-<width>.webp for every image in public/images and every
 * width in lib/image-widths.json, the list next.config.ts gives to next/image.
 * Images are never enlarged: a width above the original reuses the original size.
 * Skips files that are already up to date, so `npm run dev` stays fast.
 */
import { mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const sourceDirectory = join(root, "public", "images");
const outputDirectory = join(sourceDirectory, "w");
const widths = JSON.parse(readFileSync(join(root, "lib", "image-widths.json"), "utf8"));

mkdirSync(outputDirectory, { recursive: true });

function isUpToDate(outputPath, sourceTime) {
  try {
    return statSync(outputPath).mtimeMs >= sourceTime;
  } catch {
    return false;
  }
}

const sources = readdirSync(sourceDirectory).filter((file) => file.endsWith(".webp"));
let generated = 0;

for (const file of sources) {
  const sourcePath = join(sourceDirectory, file);
  const sourceTime = statSync(sourcePath).mtimeMs;
  for (const width of widths) {
    const outputPath = join(outputDirectory, `${parse(file).name}-${width}.webp`);
    if (isUpToDate(outputPath, sourceTime)) continue;
    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: 90, effort: 6 })
      .toFile(outputPath);
    generated++;
  }
}

console.log(`images: ${sources.length} sources × ${widths.length} widths, ${generated} generated`);
