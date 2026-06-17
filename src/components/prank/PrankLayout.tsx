import type { ReactNode } from "react";

type PrankLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function PrankLayout({ title, children }: PrankLayoutProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center">
      <h2 className="m-0 max-w-md text-3xl font-semibold leading-tight tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-10 flex w-full max-w-md flex-col items-center">{children}</div>
    </section>
  );
}
