import { useState } from "react";
import type { PrankFormState } from "../../types/prank";
import { DEFAULT_PRANK } from "../../lib/constants";
import { buildShareUrl, encodePrankPayload } from "../../lib/prankStorage";
import { useMediaUpload } from "../../hooks/useMediaUpload";
import FileUploadField from "./FileUploadField";
import SassMessageList from "./SassMessageList";
import ShareLinkPanel from "./ShareLinkPanel";
import SoundPicker from "./SoundPicker";
import { isCustomSound } from "../../lib/sounds";

type CreatorFormProps = {
  onPreview?: (form: PrankFormState) => void;
};

export default function CreatorForm({ onPreview }: CreatorFormProps) {
  const [form, setForm] = useState<PrankFormState>(DEFAULT_PRANK);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { uploadSound, error: uploadError } = useMediaUpload();

  const update = <K extends keyof PrankFormState>(key: K, value: PrankFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setShareUrl(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = await encodePrankPayload({
        ...form,
        sassMessages: form.sassMessages.filter((m) => m.trim()),
        createdAt: new Date().toISOString(),
      });
      setShareUrl(buildShareUrl(payload));
    } finally {
      setSaving(false);
    }
  };

  const handleSound = async (file: File) => {
    const url = await uploadSound(file);
    if (url) update("victorySoundUrl", url);
  };

  const isValid =
    form.title.trim() &&
    form.yesButtonText.trim() &&
    form.noButtonText.trim() &&
    form.sassMessages.some((m) => m.trim()) &&
    form.victoryMessage.trim();

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium text-ink">
          Title / prompt
        </label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="border border-ink/20 bg-transparent px-3 py-2 text-base text-ink outline-none focus:border-ink"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="yes" className="text-sm font-medium text-ink">
            Yes button
          </label>
          <input
            id="yes"
            type="text"
            value={form.yesButtonText}
            onChange={(e) => update("yesButtonText", e.target.value)}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="no" className="text-sm font-medium text-ink">
            No button
          </label>
          <input
            id="no"
            type="text"
            value={form.noButtonText}
            onChange={(e) => update("noButtonText", e.target.value)}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <SassMessageList
        messages={form.sassMessages}
        onChange={(messages) => update("sassMessages", messages)}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="victory" className="text-sm font-medium text-ink">
          Victory message
        </label>
        <input
          id="victory"
          type="text"
          value={form.victoryMessage}
          onChange={(e) => update("victoryMessage", e.target.value)}
          className="border border-ink/20 bg-transparent px-3 py-2 text-base text-ink outline-none focus:border-ink"
        />
      </div>

      <SoundPicker
        value={form.victorySoundUrl || ""}
        onChange={(path) => update("victorySoundUrl", path)}
      />

      <div className="flex flex-col gap-2">
        <p className="m-0 text-xs text-ink/50">Or upload your own (embedded in link)</p>
        <FileUploadField
          label="Custom sound"
          previewUrl={isCustomSound(form.victorySoundUrl || "") ? form.victorySoundUrl : undefined}
          onFileSelect={handleSound}
          onClear={() => update("victorySoundUrl", "")}
        />
      </div>

      {uploadError && <p className="m-0 text-sm text-ink">{uploadError}</p>}

      <div className="flex gap-3">
        {onPreview && (
          <button
            type="button"
            onClick={() => onPreview(form)}
            className="flex-1 cursor-pointer border border-ink/20 bg-transparent px-6 py-3 text-sm font-medium text-ink"
          >
            preview
          </button>
        )}
        <button
          type="submit"
          disabled={!isValid || saving}
          className="flex-1 cursor-pointer border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "generating…" : "generate link"}
        </button>
      </div>

      {shareUrl && <ShareLinkPanel url={shareUrl} />}
    </form>
  );
}
