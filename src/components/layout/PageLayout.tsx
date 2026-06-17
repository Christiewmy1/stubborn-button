import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  narrow?: boolean;
};

export default function PageLayout({ children, narrow = false }: PageLayoutProps) {
  return (
    <main
      className={`mx-auto flex min-h-dvh flex-col px-6 pb-16 ${
        narrow ? "max-w-lg" : "max-w-2xl"
      }`}
    >
      {children}
    </main>
  );
}
