import { Plus, Trash2 } from "lucide-react";

type SassMessageListProps = {
  messages: string[];
  onChange: (messages: string[]) => void;
};

export default function SassMessageList({ messages, onChange }: SassMessageListProps) {
  const update = (index: number, value: string) => {
    const next = [...messages];
    next[index] = value;
    onChange(next);
  };

  const remove = (index: number) => {
    if (messages.length <= 1) return;
    onChange(messages.filter((_, i) => i !== index));
  };

  const add = () => onChange([...messages, ""]);

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-ink">Sass messages</label>
      {messages.map((msg, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={msg}
            onChange={(e) => update(i, e.target.value)}
            placeholder="e.g. Nope"
            className="flex-1 border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-ink"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            disabled={messages.length <= 1}
            className="cursor-pointer border-0 bg-transparent p-2 text-ink/40 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Remove message"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex cursor-pointer items-center gap-1 border-0 bg-transparent text-sm text-ink/60"
      >
        <Plus size={14} />
        add message
      </button>
    </div>
  );
}
