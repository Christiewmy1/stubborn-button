import { useCallback, useState } from "react";
import { MAX_SOUND_SIZE_BYTES } from "../lib/constants";
import { fileToDataUrl } from "../lib/prankStorage";

export function useMediaUpload() {
  const [error, setError] = useState<string | null>(null);

  const uploadSound = useCallback(async (file: File): Promise<string | null> => {
    setError(null);

    if (!file.type.startsWith("audio/")) {
      setError("Sound must be a valid audio file.");
      return null;
    }

    if (file.size > MAX_SOUND_SIZE_BYTES) {
      setError(`Sound must be under ${Math.round(MAX_SOUND_SIZE_BYTES / 1000)}KB for shareable links.`);
      return null;
    }

    return fileToDataUrl(file);
  }, []);

  return { uploadSound, error, clearError: () => setError(null) };
}
