import type { PrankConfig } from "../types/prank";

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(encoded: string): Uint8Array {
  const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const base64 = padded + "=".repeat(padLength);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function compressJson(json: string): Promise<Uint8Array> {
  const stream = new Blob([json]).stream().pipeThrough(new CompressionStream("gzip"));
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
}

async function decompressJson(bytes: Uint8Array): Promise<string> {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Response(stream).text();
}

export async function encodePrankPayload(config: PrankConfig): Promise<string> {
  const json = JSON.stringify(config);
  const compressed = await compressJson(json);
  return toBase64Url(compressed);
}

export async function decodePrankPayload(encoded: string): Promise<PrankConfig> {
  const bytes = fromBase64Url(encoded);
  const json = await decompressJson(bytes);
  const parsed = JSON.parse(json) as PrankConfig;

  if (!parsed.title || !parsed.sassMessages?.length) {
    throw new Error("Invalid prank payload");
  }

  return parsed;
}

export function buildShareUrl(payload: string): string {
  const base = window.location.origin;
  return `${base}/p/${payload}`;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}
