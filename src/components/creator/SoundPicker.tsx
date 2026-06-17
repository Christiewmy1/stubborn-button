import { useRef } from "react";
import { Play } from "lucide-react";
import { SOUND_PRESETS, isCustomSound } from "../../lib/sounds";

type SoundPickerProps = {
  value: string;
  onChange: (path: string) => void;
};

function SoundRow({
  label,
  selected,
  onSelect,
  onPreview,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  onPreview?: () => void;
}) {
  return (
    <div
      className={`flex items-center border-b border-ink/10 last:border-b-0 ${
        selected ? "bg-ink text-paper" : "bg-transparent text-ink"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="min-w-0 flex-1 cursor-pointer truncate px-4 py-3 text-left text-sm"
      >
        {label}
      </button>
      {onPreview && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          aria-label={`Preview ${label}`}
          className={`shrink-0 cursor-pointer border-0 border-l px-3 py-3 ${
            selected
              ? "border-paper/20 text-paper/70 hover:text-paper"
              : "border-ink/10 text-ink/50 hover:text-ink"
          }`}
        >
          <Play size={14} />
        </button>
      )}
    </div>
  );
}

export default function SoundPicker({ value, onChange }: SoundPickerProps) {
  const previewRef = useRef<HTMLAudioElement | null>(null);

  const playPreview = (path: string) => {
    if (previewRef.current) {
      previewRef.current.pause();
    }
    const audio = new Audio(path);
    previewRef.current = audio;
    audio.play().catch(() => {});
  };

  const selectedPreset = !value || isCustomSound(value) ? null : value;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="text-sm font-medium text-ink">Victory sound</label>
        <p className="m-0 mt-1 text-xs text-ink/50">
          Built-in sounds don&apos;t count against link size
        </p>
      </div>

      {/* Mobile: scrollable list */}
      <div className="overflow-hidden border border-ink/20 sm:hidden">
        <SoundRow label="None" selected={!value} onSelect={() => onChange("")} />
        <div className="max-h-56 overflow-y-auto overscroll-contain">
          {SOUND_PRESETS.map((preset) => (
            <SoundRow
              key={preset.id}
              label={preset.label}
              selected={selectedPreset === preset.path}
              onSelect={() => onChange(preset.path)}
              onPreview={() => playPreview(preset.path)}
            />
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden sm:block">
        <button
          type="button"
          onClick={() => onChange("")}
          className={`mb-2 w-full cursor-pointer border px-3 py-2 text-left text-sm transition-colors ${
            !value
              ? "border-ink bg-ink text-paper"
              : "border-ink/20 bg-transparent text-ink hover:border-ink/40"
          }`}
        >
          None
        </button>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {SOUND_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.path;

            return (
              <div
                key={preset.id}
                className={`flex items-center border ${
                  isSelected ? "border-ink" : "border-ink/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onChange(preset.path)}
                  className={`min-w-0 flex-1 cursor-pointer truncate px-3 py-2 text-left text-sm ${
                    isSelected ? "bg-ink text-paper" : "bg-transparent text-ink"
                  }`}
                >
                  {preset.label}
                </button>
                <button
                  type="button"
                  onClick={() => playPreview(preset.path)}
                  aria-label={`Preview ${preset.label}`}
                  className="cursor-pointer border-0 border-l border-ink/20 bg-transparent px-2 py-2 text-ink/60 hover:text-ink"
                >
                  <Play size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
