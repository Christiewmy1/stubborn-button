import { useRef } from "react";
import { Play } from "lucide-react";
import { SOUND_PRESETS, isCustomSound, type SoundPreset } from "../../lib/sounds";

type SoundPickerProps = {
  value: string;
  onChange: (path: string) => void;
};

const NONE_PRESET: SoundPreset = { id: "none", label: "None", path: "" };

const SOUND_OPTIONS: SoundPreset[] = [NONE_PRESET, ...SOUND_PRESETS];

function SoundCell({
  preset,
  selected,
  onSelect,
  onPreview,
}: {
  preset: SoundPreset;
  selected: boolean;
  onSelect: () => void;
  onPreview?: () => void;
}) {
  return (
    <div
      className={`flex items-center border ${
        selected ? "border-ink" : "border-ink/20"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`min-w-0 flex-1 cursor-pointer truncate px-3 py-2 text-left text-sm ${
          selected ? "bg-ink text-paper" : "bg-transparent text-ink"
        }`}
      >
        {preset.label}
      </button>
      {onPreview && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          aria-label={`Preview ${preset.label}`}
          className={`shrink-0 cursor-pointer border-0 border-l px-2 py-2 ${
            selected
              ? "border-paper/20 text-paper/70 hover:text-paper"
              : "border-ink/20 text-ink/60 hover:text-ink"
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

      <div className="max-h-56 overflow-y-auto overscroll-contain border border-ink/20 p-2 sm:max-h-none sm:overflow-visible sm:p-0">
        <div className="grid grid-cols-2 gap-2">
          {SOUND_OPTIONS.map((preset) => {
            const isNone = preset.path === "";
            const isSelected = selectedPreset === preset.path;

            return (
              <SoundCell
                key={preset.id}
                preset={preset}
                selected={isSelected}
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
