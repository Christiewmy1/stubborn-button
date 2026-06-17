import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard } from "../../lib/prankStorage";

type ShareLinkPanelProps = {
  url: string;
};

export default function ShareLinkPanel({ url }: ShareLinkPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 border-t border-ink/10 pt-8">
      <p className="m-0 text-sm font-medium text-ink">Your link is ready</p>
      <div className="flex gap-2">
        <input
          type="text"
          readOnly
          value={url}
          className="min-w-0 flex-1 border border-ink/20 bg-transparent px-3 py-2 text-xs text-ink outline-none"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 cursor-pointer items-center gap-1 border border-ink bg-ink px-4 py-2 text-sm text-paper"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
    </div>
  );
}
