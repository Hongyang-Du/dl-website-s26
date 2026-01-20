"use client";

export function useAssetPath() {
  // Since we removed basePath from next.config.ts, we don't need path prefixing
  return (path: string) => path;
}
