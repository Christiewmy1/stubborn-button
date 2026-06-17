import YesButton from "./YesButton";
import EvasiveButton from "./EvasiveButton";

type PrankLayoutProps = {
  title: string;
  yesLabel: string;
  onYes: () => void;
  noLabel: string;
  sassMessages: string[];
};

export default function PrankLayout({
  title,
  yesLabel,
  onYes,
  noLabel,
  sassMessages,
}: PrankLayoutProps) {
  return (
    <section className="flex w-full max-w-md flex-1 flex-col items-center pb-[24dvh] text-center">
      <h2 className="m-0 max-w-md shrink-0 text-3xl font-semibold leading-tight tracking-tight text-ink">
        {title}
      </h2>

      <div className="mt-10 shrink-0">
        <YesButton label={yesLabel} onClick={onYes} />
      </div>

      <div className="relative mt-6 min-h-[30dvh] w-full flex-1">
        <EvasiveButton
          label={noLabel}
          sassMessages={sassMessages}
          enabled
          fullArea
        />
      </div>
    </section>
  );
}
