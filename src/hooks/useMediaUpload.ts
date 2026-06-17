import { useCallback, useState } from "react";
import { MAX_IMAGE_SIZE_BYTES, MAX_SOUND_SIZE_BYTES } from "../lib/constants";
import { fileToDataUrl } from "../lib/prankStorage";

type MediaField = "victoryImageUrl" | "victorySoundUrl";

export function useMediaUpload() {
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File, field: MediaField): Promise<string | null> => {
      setError(null);

      const isImage = field === "victoryImageUrl";
      const maxSize = isImage ? MAX_IMAGE_SIZE_BYTES : MAX_SOUND_SIZE_BYTES;
      const label = isImage ? "Image" : "Sound";

      if (!file.type.startsWith(isImage ? "image/" : "audio/")) {
        setError(`${label} must be a valid ${isImage ? "image" : "audio"} file.`);
        return null;
      }

      if (file.size > maxSize) {
        setError(`${label} must be under ${Math.round(maxSize / 1000)}KB for shareable links.`);
        return null;
      }

      return fileToDataUrl(file);
    },
    [],
  );

  return { upload, error, clearError: () => setError(null) };
}
