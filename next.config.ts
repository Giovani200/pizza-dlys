import type { NextConfig } from "next";
import imageWidths from "./lib/image-widths.json";

const SMALLEST_DEVICE_WIDTH = 640;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    imageSizes: imageWidths.filter((width) => width < SMALLEST_DEVICE_WIDTH),
    deviceSizes: imageWidths.filter((width) => width >= SMALLEST_DEVICE_WIDTH),
  },
};

export default nextConfig;
