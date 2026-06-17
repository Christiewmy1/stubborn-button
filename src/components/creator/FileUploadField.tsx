import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { MAX_IMAGE_SIZE_BYTES, MAX_SOUND_SIZE_BYTES } from "../../lib/constants";

type FileUploadFieldProps = {
  label: string;
  accept: string;
  previewUrl?: string;
  isAudio?: boolean;
  onFileSelect: (file: File) => void;
  onClear: () => void;
};

export default function FileUploadField({
  label,
  accept,
  previewUrl,
  isAudio = false,
  onFileSelect,
  onClear,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maxKb = isAudio
    ? Math.round(MAX_SOUND_SIZE_BYTES / 1000)
    : Math.round(MAX_IMAGE_SIZE_BYTES / 1000);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-ink">{label}</label>
      <p className="m-0 text-xs text-ink/50">Max {maxKb}KB — embedded in share link</p>

      {previewUrl ? (
        <div className="flex items-center gap-4">
          {isAudio ? (
            <audio src={previewUrl} controls className="h-8 max-w-full" />
          ) : (
            <img src={previewUrl} alt="Preview" className="h-20 object-contain" />
          )}
          <button
            type="button"
            onClick={onClear}
            className="flex cursor-pointer items-center gap-1 border-0 bg-transparent text-sm text-ink/60"
          >
            <X size={14} />
            remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer items-center gap-2 border border-ink/20 bg-transparent px-4 py-3 text-sm text-ink"
        >
          <Upload size={16} />
          upload {isAudio ? "sound" : "image"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
