import { useRef } from "react";
import { Play } from "lucide-react";
import { SOUND_PRESETS, isCustomSound, type SoundPreset } from "../../lib/sounds";

type SoundPickerProps = {
  value: string;
  onChange: (path: string) => void;
};

const NONE_PRESET: SoundPreset = { id: "none", label: "None", path: "" };

const SOUND_OPTIONS: SoundPreset[] = [NONE_PRESET, ...SOUND_PRESETS];

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

  const selectedPreset = !value || isCustomSound(value) ? "" : value;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="text-sm font-medium text-ink">Victory sound</label>
        <p className="m-0 mt-1 text-xs text-ink/50">
          Built-in sounds don&apos;t count against link size
        </p>
      </div>

      <div className="overflow-hidden border border-ink/20">
        <div className="max-h-56 overflow-y-auto overscroll-contain">
          {SOUND_OPTIONS.map((preset) => {
            const isNone = preset.path === "";

            return (
              <SoundRow
                key={preset.id}
                label={preset.label}
                selected={selectedPreset === preset.path}
                onSelect={() => onChange(preset.path)}
                onPreview={isNone ? undefined : () => playPreview(preset.path)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
