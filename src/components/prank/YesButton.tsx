type YesButtonProps = {
  label: string;
  onClick: () => void;
};

export default function YesButton({ label, onClick }: YesButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer border border-ink bg-ink px-8 py-3 text-base font-medium text-paper transition-opacity hover:opacity-80"
    >
      {label}
    </button>
  );
}
